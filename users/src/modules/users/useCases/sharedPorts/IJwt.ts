import { IDType } from "../../../shared/entities/types";

export interface IJwt {
  create(userId: IDType): string;
  decode(token: string): { userId: IDType };
}