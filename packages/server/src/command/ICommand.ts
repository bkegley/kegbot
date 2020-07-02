import { ChatUserstate } from "tmi.js";

export interface ICommand {
  handleCommand(
    channel: string,
    user: ChatUserstate,
    message: string,
    self: boolean
  ): void;
}
