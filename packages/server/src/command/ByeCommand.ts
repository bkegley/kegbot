import { ICommand } from "./ICommand";
import { IUserService } from "../service";
import { ChatUserstate } from "tmi.js";

export class ByeCommand implements ICommand {
    private readonly userService: IUserService;

    constructor(userService: IUserService) {
        this.userService = userService;
    }

    public async handleCommand(
        channel: string,
        user: ChatUserstate,
        message: string,
        self: boolean
    ) {
        console.log({ user });
        if (user.username) {
            const [_, command, ...response] = message.split(" ");
            const foundUser = await this.userService.findOrCreateUser(
                user.username
            );
            console.log({ foundUser });
        }
    }
}
