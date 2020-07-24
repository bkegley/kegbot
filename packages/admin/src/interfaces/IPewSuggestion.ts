export interface IPewSuggestion {
  id: number;
  name: string;
  description: string;
  status: PewSuggestionStatus;
}

export enum PewSuggestionStatus {
  PENDING = "pending",
  APPROVED = "approved",
  DENIED = "denied"
}
