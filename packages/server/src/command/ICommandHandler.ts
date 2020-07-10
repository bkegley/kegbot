export interface ICommandHandler {
  handle(
        channel: string,
        user: ChatUserstate,
        message: string,
        self: boolean
  ): void
}
