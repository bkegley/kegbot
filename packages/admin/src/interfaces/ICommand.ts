export interface ICommand {
  id: number;
  command: string;
  aliases: Array<{ alias: string }>;
  response: string;
  modOnly: boolean;
}
