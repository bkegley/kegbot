import { BaseService } from "../abstract";
import { IPewService } from "./IPewService";
import { Pew } from "../entity/Pew";
import { PewSuggestion, PewSuggestionStatus } from "../entity/PewSuggestion";

export class PewService extends BaseService implements IPewService {
  async listPews() {
    const pews = await this.manager.createQueryBuilder(Pew, "pew").getMany();
    return pews;
  }

  async listPewSuggestions({ status }: { status: string[] | undefined }) {
    const pewSuggestions = await this.manager
      .createQueryBuilder(PewSuggestion, "pewSuggestion")
      .where("status IN (:...status)", {
        status: status ?? Object.values(PewSuggestionStatus)
      })
      .getMany();
    return pewSuggestions;
  }

  async getByName(name: string) {
    const pew = await this.manager
      .createQueryBuilder(Pew, "pew")
      .where("name = :name", { name })
      .getOne();
    return pew;
  }

  async createSuggestion(
    username: string,
    input: Omit<PewSuggestion, "id" | "statuapproveds" | "user">
  ) {
    const pewSuggestion = new PewSuggestion();

    //@ts-ignore
    pewSuggestion.user = username;

    ((Object.keys(input) as unknown) as Array<keyof PewSuggestion>).forEach(
      (key: keyof PewSuggestion) => {
        // @ts-ignore
        pewSuggestion[key] = input[key];
      }
    );

    await this.manager.save(pewSuggestion);
    return pewSuggestion;
  }

  async moderateSuggestion(
    pewId: string,
    { status }: { status: PewSuggestionStatus }
  ) {
    const pewSuggestion = await this.manager
      .createQueryBuilder(PewSuggestion, "pewSuggestion")
      .update({ status })
      .where("id = :id", { id: parseInt(pewId) })
      .execute();

    this.io.emit("pew-moderated", { id: pewId, status });

    return pewSuggestion.affected === 1;
  }

  async create(input: Omit<Pew, "id">) {
    const pew = new Pew();
    ((Object.keys(input) as unknown) as Array<keyof Pew>).forEach(
      (key: keyof Pew) => {
        // @ts-ignore
        pew[key] = input[key];
      }
    );
    await this.manager.save(pew);
    return pew;
  }

  async update(id: number, input: Omit<Pew, "id">) {
    const res = await this.manager
      .createQueryBuilder(Pew, "pew")
      .update(input)
      .where("id = :id", { id })
      .execute();
    return { id, ...input };
  }

  async delete(id: number) {
    const res = await this.manager
      .createQueryBuilder(Pew, "pew")
      .delete()
      .where("id = :id", { id })
      .execute();

    return true;
  }
}
