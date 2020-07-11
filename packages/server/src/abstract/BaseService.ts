import { EntityManager } from "typeorm";
import { Server } from "socket.io";

export class BaseService {
  protected manager: EntityManager;
  protected io: Server;

  constructor(manager: EntityManager, io: Server) {
    this.manager = manager;
    this.io = io;
  }
}
