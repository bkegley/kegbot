import { BaseService } from "../abstract";
import { IPewService } from "./IPewService";
import { Pew } from "../entity/Pew";

export class PewService extends BaseService implements IPewService {
  async getByName(name: string) {
    const pew = await this.manager
      .createQueryBuilder(Pew, "pew")
      .where("name = :name", { name })
      .getOne();
    return pew;
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
