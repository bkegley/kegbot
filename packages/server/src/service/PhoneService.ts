import { BaseService } from "../abstract";
import { IPhoneService } from "./IPhoneService";

export class PhoneService extends BaseService implements IPhoneService {
  isRinging = false;
  private ringingInterval!: NodeJS.Timeout;
  private ringingTimeout!: NodeJS.Timeout;

  private baseInterval = 5000;
  private baseRingLength = 4000;

  private currentPhoneFrequencyMultiplier = 1;

  init(phoneFrequencyMultiplier?: number) {
    if (phoneFrequencyMultiplier) {
      this.currentPhoneFrequencyMultiplier = phoneFrequencyMultiplier;
    }

    this.ringingInterval = setInterval(() => {
      console.log("phone is going to ring");
      this.io.emit("phone-ringing", true);
      this.isRinging = true;
      this.ringingTimeout = setTimeout(() => {
        console.log("phone is going to stop ringing");
        this.io.emit("phone-ringing", false);
        this.isRinging = false;
      }, this.baseRingLength * this.currentPhoneFrequencyMultiplier);
    }, this.baseInterval * this.currentPhoneFrequencyMultiplier);
  }

  answer(username: string) {
    if (this.isRinging) {
      this.isRinging = false;
      clearTimeout(this.ringingTimeout);
      clearInterval(this.ringingInterval);
      console.log(`${username} answered the call`);
      this.io.emit("phone-ringing", false);
    }
  }

  reset() {
    if (this.ringingInterval) {
      clearInterval(this.ringingInterval);
    }
    if (this.ringingTimeout) {
      clearTimeout(this.ringingTimeout);
    }
  }

  restart() {
    if (!this.isRinging) {
      this.init(this.currentPhoneFrequencyMultiplier);
    }
  }
}
