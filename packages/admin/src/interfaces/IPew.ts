export interface IPew {
  id: number;
  uuid: string;
  name: string;
  cost: number;
  expendable: boolean;
  healthModification?: number;
  speedModification?: number;
  speedModificationTimeout?: number;
}
