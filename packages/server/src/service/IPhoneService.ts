export interface IPhoneService {
  isRinging: boolean;
  answer(username: string): void;
  init(phoneFrequencyMultiplier?: number): void;
  restart(): void;
}
