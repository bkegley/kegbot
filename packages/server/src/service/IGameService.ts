export interface GameOptions {
  difficulty: number;
  rewardMultiplier: number;
  phoneFrequencyMultiplier: number;
}

export interface IGame {
  activeDeliverySession: boolean;
}

export interface IGameService {
  startGame(option: GameOptions): void;
  getGame(): any;
}
