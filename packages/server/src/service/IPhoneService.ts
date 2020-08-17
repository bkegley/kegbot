export interface IPhoneService {
  isRinging: boolean;
  answer(): void;
  init(phoneFrequencyMultiplier?: number): void;
  reset(): void;
  restart(): void;
}
