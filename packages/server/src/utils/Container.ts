import { BaseModule } from "./BaseModule";

export interface IContainer {
  bind<T>(inter: Symbol, init: T): void;
  bind<T>(inter: Symbol, init: (resolver: IResolver) => T): void;
}

export interface IResolver {
  resolve<T>(clazz: Symbol): T;
}

export class Container implements IContainer, IResolver {
  private registry = new Map();
  private moduleRegistry = new Array<typeof BaseModule>();

  public bind<T>(inter: Symbol, init: T | ((resolver: IResolver) => T)) {
    if (typeof init === "function") {
      this.registry.set(inter, init);
    }
    this.registry.set(inter, init);
    return this;
  }

  public resolve<T>(clazz: Symbol): T {
    const thing = this.registry.get(clazz);
    if (typeof thing === "function") {
      return thing(this);
    }
    return thing;
  }

  public registerModule(module: typeof BaseModule) {
    this.moduleRegistry.push(module);
    return this;
  }

  public build() {
    this.moduleRegistry.forEach((module) => {
      new module(this).init();
    });
  }
}
