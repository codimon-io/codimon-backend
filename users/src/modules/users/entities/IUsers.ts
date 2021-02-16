import { IEntities } from "../../shared/entities/IEntities";

export interface IUsers extends IEntities {
  name: string;
  email: string;
  password: string;
}