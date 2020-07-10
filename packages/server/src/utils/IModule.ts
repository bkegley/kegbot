import { Container } from "./Container";

export interface IModuleConstructor {
  new (container: Container): IModule;
}

export interface IModule {
  init(): void;
}
