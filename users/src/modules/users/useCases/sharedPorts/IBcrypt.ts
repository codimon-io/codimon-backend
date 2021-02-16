import { IUsers } from "../../entities/IUsers";

export interface IBcrypt {
  hash(password: string): Promise<string>;
  verify(user: IUsers, password: string): Promise<boolean>;
}