export interface IPhoneService {
  isRinging: boolean;
  answer(username: string): void;
  init(): void;
  restart(): void;
}
