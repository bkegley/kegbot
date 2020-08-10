import { IDeliverySession } from "./index";

export interface IGameOptions {
  difficultyModifier: number;
  rewardMultiplier: number;
  phoneFrequencyMultiplier: number;
}

export interface IGame {
  options: IGameOptions;
  activeDeliverySession: IDeliverySession;
}
