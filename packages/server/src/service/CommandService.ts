import { ICommandService } from "./ICommandService";
import { Command } from "../entity/Command";
import { BaseService } from "../abstract";

export class CommandService extends BaseService implements ICommandService {
  async getCommand(command: string) {
    const foundCommand = await this.manager
      .createQueryBuilder(Command, "command")
      .where("command = :command", { command })
      .getOne();
    return foundCommand;
  }

  async create(input: { command: string; response: string }) {
    const command = new Command();
    command.command = input.command;
    command.response = input.response;
    await this.manager.save(command);
    return command;
  }
}
