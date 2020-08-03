import { IDeliverySession } from "./index";

export interface IGameOptions {
  difficulty: number;
  rewardMultiplier: number;
  phoneFrequencyMultiplier: number;
}

export interface IGame {
  options: IGameOptions;
  activeDeliverySession: IDeliverySession;
}
