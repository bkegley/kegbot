import { Pew } from "../entity/Pew";
import { PewSuggestion, PewSuggestionStatus } from "../entity/PewSuggestion";

export interface IPewService {
  listPews(): Promise<Pew[] | undefined>;
  listPewSuggestions(params: {
    status: string[] | undefined;
  }): Promise<PewSuggestion[] | undefined>;
  getByName(name: string): Promise<Pew | undefined>;
  createSuggestion(
    username: string,
    input: Omit<PewSuggestion, "id" | "status" | "user">
  ): Promise<PewSuggestion | undefined>;
  moderateSuggestion(
    pewId: string,
    input: { status: PewSuggestionStatus }
  ): Promise<boolean>;
  create(input: Omit<Pew, "id">): Promise<Pew>;
  update(id: number, input: Omit<Pew, "id">): Promise<Pew | undefined>;
  delete(id: number): Promise<boolean>;
}
