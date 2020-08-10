export interface IPhoneService {
  isRinging: boolean;
  answer(username: string): void;
  init(phoneFrequencyMultiplier?: number): void;
  reset(): void;
  restart(): void;
}
