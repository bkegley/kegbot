import { Pew } from "../entity/Pew";

export interface IPewService {
  getByName(name: string): Promise<Pew | undefined>;
  create(input: Omit<Pew, "id">): Promise<Pew>;
  update(id: number, input: Omit<Pew, "id">): Promise<Pew | undefined>;
  delete(id: number): Promise<boolean>;
}
