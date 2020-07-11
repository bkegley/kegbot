import { Command } from "../entity/Command";

export interface ICommandService {
  listCommands(): Promise<Command[] | undefined>;
  getCommand(command: string): Promise<Command | undefined>;
  create(input: { command: string; response: string }): Promise<Command>;
  delete(id: string): Promise<string>;
}
