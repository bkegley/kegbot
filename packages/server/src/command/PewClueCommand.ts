import { ICommand } from "./ICommand";
import { Server } from "socket.io";
import { ChatUserstate, Client } from "tmi.js";

type IHelp = {
  [command: string]: {
    use: string;
    description: string;
  };
};

const help: IHelp = {
  "!hi": {
    use: "!hi any message",
    description: "Add yourself to the db so you can play the game!"
  },
  "!list": {
    use: "!list pews/vehicles",
    description: "List the available items to purchase"
  },
  "!purchase": {
    use: "!purchase pew/vehicle name",
    description: "Purchase a pew or vehicle"
  },
  "!answer": {
    use: "!answer",
    description: "Answer the phone when it's ringing"
  },
  "!choosecruise": {
    use: "!choosecruise id",
    description: "Choose your vehicle for the delivery"
  },
  "!pewpew": {
    use: "!pewpew pewName",
    description: "During a delivery session attack the driver"
  }
};

export class PewClueCommand implements ICommand {
  private io: Server;
  private twitchClient: Client;

  constructor(io: Server, twitchClient: Client) {
    this.io = io;
    this.twitchClient = twitchClient;
  }

  public async handleCommand(
    channel: string,
    user: ChatUserstate,
    message: string,
    self: boolean
  ) {
    this.io.emit("pew-clue", help);
  }
}
