import { Container } from "./Container";
import { IModule } from "./IModule";

export class BaseModule implements IModule {
  protected container: Container;

  constructor(container: Container) {
    this.container = container;
  }

  init() {}
}
