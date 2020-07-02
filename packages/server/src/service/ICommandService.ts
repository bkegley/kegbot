import { Command } from "../entity/Command";

export interface ICommandService {
  getCommand(command: string): Promise<Command | undefined>;
  create(input: { command: string; response: string }): Promise<Command>;
}
