import { EntityManager } from "typeorm";

export class BaseService {
  protected manager: EntityManager;

  constructor(manager: EntityManager) {
    this.manager = manager;
  }
}
