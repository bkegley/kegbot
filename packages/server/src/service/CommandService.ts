import { ICommandService } from "./ICommandService";
import { Command } from "../entity/Command";
import { BaseService } from "../abstract";

export class CommandService extends BaseService implements ICommandService {
  async listCommands() {
    const commands = await this.manager
      .createQueryBuilder(Command, "command")
      .getMany();

    return commands;
  }

  async getCommand(command: string) {
    const foundCommand = await this.manager
      .createQueryBuilder(Command, "command")
      .where("command = :command", { command })
      .getOne();

    return foundCommand;
  }

  async create(input: { command: string; response: string; modOnly: boolean }) {
    const command = new Command();
    command.command = input.command;
    command.response = input.response;
    command.modOnly = input.modOnly;
    await this.manager.save(command);
    this.io.emit("command-created", command);

    return command;
  }

  async updateCommand(
    id: string,
    input: { command: string; response: string; modOnly: boolean }
  ) {
    const res = await this.manager
      .createQueryBuilder(Command, "command")
      .update(input)
      .where("id = :id", { id })
      .execute();

    if (res.affected === 1) {
      this.io.emit("command-updated", { id, ...input });
    }

    return { id, ...input };
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
