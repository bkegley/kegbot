export interface IHelp {
  [command: string]: {
    use: string;
    description: string;
  };
}
