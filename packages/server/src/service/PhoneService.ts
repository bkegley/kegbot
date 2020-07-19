import { BaseService } from "../abstract";
import { IPhoneService } from "./IPhoneService";

export class PhoneService extends BaseService implements IPhoneService {
  isRinging = false;
  private ringingInterval!: NodeJS.Timeout;
  private ringingTimeout!: NodeJS.Timeout;

  init() {
    this.ringingInterval = setInterval(() => {
      this.io.emit("phone-ringing", true);
      this.isRinging = true;
      this.ringingTimeout = setTimeout(() => {
        this.io.emit("phone-ringing", false);
        this.isRinging = false;
      }, 4000);
    }, 5000);
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

  restart() {
    if (!this.isRinging) {
      this.init();
    }
  }
}
