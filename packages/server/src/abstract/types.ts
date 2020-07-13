export const TYPES = {
  // abstract
  CommandHandler: Symbol("CommandHandler"),
  EntityManager: Symbol("EntityManager"),
  ExpressApplication: Symbol("ExpressApplication"),
  IOServer: Symbol("IOServer"),
  Router: Symbol("Router"),
  TwitchClient: Symbol("TwitchClient"),

  // commands
  CreateCommand: Symbol("CreateCommand"),
  HiCommand: Symbol("HiCommand"),

  // services
  CommandService: Symbol("CommandService"),
  PhoneService: Symbol("PhoneService"),
  UserService: Symbol("UserService")
};
