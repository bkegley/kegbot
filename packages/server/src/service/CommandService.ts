import { ICommandService } from "./ICommandService";
import { Command } from "../entity/Command";
import { BaseService } from "../abstract";
import { CommandAlias } from "../entity/CommandAlias";

export class CommandService extends BaseService implements ICommandService {
  async listCommands() {
    const commands = this.manager
      .createQueryBuilder(Command, "command")
      .leftJoinAndSelect("command.aliases", "aliases")
      .getMany();

    return commands;
  }

  async getCommand(id: number) {
    const foundCommand = await this.manager
      .createQueryBuilder(Command, "command")
      .leftJoinAndSelect("command.aliases", "aliases")
      .where("command.id = :id", { id })
      .getOne();

    return foundCommand;
  }

  async getCommandByName(command: string) {
    const foundCommand = await this.manager
      .createQueryBuilder(Command, "command")
      .leftJoinAndSelect("command.aliases", "aliases")
      .where("command.command = :command", { command })
      .orWhere("aliases.alias = :command", { command })
      .getOne();

    return foundCommand;
  }

  async create(input: { command: string; response: string; modOnly: boolean }) {
    const command = new Command();
    command.command = input.command.trim().replace(" ", "-");
    command.response = input.response;
    command.modOnly = input.modOnly;
    await this.manager.save(command);
    this.io.emit("command-created", command);

    return command;
  }

  async updateCommand(
    id: string,
    input: {
      command: string;
      response: string;
      modOnly: boolean;
      aliases: Array<{ alias: string }>;
    }
  ) {
    const { aliases, ...remainingInput } = input;

    const [command, existingAliases] = await Promise.all([
      this.manager
        .createQueryBuilder(Command, "command")
        .where("id = :id", { id })
        .getOne(),
      this.manager
        .createQueryBuilder(CommandAlias, "commandAlias")
        .where("alias IN (:...aliases)", { aliases })
        .getMany()
    ]);

    if (!command) {
      throw new Error("No command found");
    }

    const toCreate = aliases.filter(alias => {
      return !existingAliases.find(
        existingAlias => existingAlias.alias === alias.alias
      );
    });

    const { toDelete, toAppend } = existingAliases.reduce(
      (acc, existingAlias) => {
        const foundAlias = aliases.find(
          alias => alias.alias === existingAlias.alias
        );
        if (foundAlias) {
          return {
            ...acc,
            toAppend: acc.toAppend.concat(existingAlias)
          };
        } else {
          return {
            ...acc,
            toDelete: acc.toDelete.concat(existingAlias)
          };
        }
      },
      { toDelete: [], toAppend: [] } as {
        toDelete: CommandAlias[];
        toAppend: CommandAlias[];
      }
    );

    await Promise.all(
      toCreate.map(async alias => {
        const commandAlias = new CommandAlias();
        commandAlias.alias = alias.alias;
        commandAlias.command = command;
        await this.manager.save(commandAlias);
        return commandAlias;
      })
    );

    if (toDelete.length) {
      await this.manager
        .createQueryBuilder(CommandAlias, "commandAlias")
        .delete()
        .where("alias IN (:aliases)", {
          aliases: toDelete.map(alias => alias.alias)
        })
        .execute();
    }

    Object.keys(remainingInput).forEach(key => {
      // @ts-ignore
      command[key] = remainingInput[key];
    });

    await this.manager.save(command);

    this.io.emit("command-updated", command);

    return command;
  }

  async delete(id: string) {
    const res = await this.manager
      .createQueryBuilder()
      .delete()
      .from(Command)
      .where("id = :id", { id })
      .execute();

    this.io.emit("command-deleted", id);
    return { id };
  }
}
