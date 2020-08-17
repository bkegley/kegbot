import { BaseService } from "../abstract";
import { IAidService } from "./IAidService";
import { Aid } from "../entity/Aid";

export class AidService extends BaseService implements IAidService {
  async listAids() {
    const aids = await this.manager.createQueryBuilder(Aid, "aid").getMany();
    return aids;
  }

  async getById(id: number) {
    const aid = await this.manager
      .createQueryBuilder(Aid, "aid")
      .where("id = :id", { id })
      .getOne();
    return aid;
  }

  async getByName(name: string) {
    const aid = await this.manager
      .createQueryBuilder(Aid, "aid")
      .where("name = :name", { name })
      .getOne();
    return aid;
  }

  async create(input: Omit<Aid, "id">) {
    const aid = new Aid();
    ((Object.keys(input) as unknown) as Array<keyof Aid>).forEach(
      (key: keyof Aid) => {
        // @ts-ignore
        aid[key] = input[key];
      }
    );
    await this.manager.save(aid);
    return aid;
  }

  async update(id: number, input: Omit<Aid, "id">) {
    const res = await this.manager
      .createQueryBuilder(Aid, "aid")
      .update(input)
      .where("id = :id", { id })
      .execute();
    return { id, ...input };
  }

  async delete(id: number) {
    const res = await this.manager
      .createQueryBuilder(Aid, "aid")
      .delete()
      .where("id = :id", { id })
      .execute();

    return true;
  }
}
