import { Aid } from "../entity/Aid";

export interface IAidService {
  listAids(): Promise<Aid[]>;
  getById(id: number): Promise<Aid | undefined>;
  getByName(name: string): Promise<Aid | undefined>;
  create(input: Omit<Aid, "id">): Promise<Aid>;
  update(id: number, input: Omit<Aid, "id">): Promise<Aid | undefined>;
  delete(id: number): Promise<boolean>;
}
