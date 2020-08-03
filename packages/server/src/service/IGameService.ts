import { DeliverySession } from "../entity/DeliverySession";

export interface GameOptions {
  difficulty: number;
  rewardMultiplier: number;
  phoneFrequencyMultiplier: number;
}

export interface IGame {
  options: GameOptions;
  activeDeliverySession: DeliverySession | undefined;
}

export interface IGameService {
  startGame(options: GameOptions): Promise<IGame>;
  stopGame(): void;
  getGame(): Promise<IGame | undefined>;
  setGameOptions(options: GameOptions): Promise<IGame>;
}
