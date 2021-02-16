import { IEntities } from "../../entities/IEntities";
import { IDType } from "../../entities/types";

export interface IRepositories<T extends IEntities>{
  create?(values: object): Promise<T>;
  findOne(query: object): Promise<T|null>;
  findById(id: IDType): Promise<T|null>;
  isAvailable(query: object): Promise<boolean>;
  delete(query: object): Promise<number>;
  /*
  findAndCountAll(
    where: any,
    pagination: {
      page: number,
      perPage: number
    }): Promise<{ count: number, rows: IRepositories[] }>;
  findById(id: IDType): Promise<IRepositories>;
  update(where: any, values: any): IRepositories[];
  destroy(where: any): Promise<number>;*/
}