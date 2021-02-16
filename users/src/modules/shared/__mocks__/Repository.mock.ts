/* tslint:disable:max-classes-per-file */
import { IEntities } from "../entities/IEntities";
import { IDType } from "../entities/types";
import { IRepositories } from "../useCases/ports/IRepositories";

export class RepositoryMock<T extends IEntities> implements IRepositories<T> {
  counter: number;
  documents: T[];

  constructor() {
    this.counter = 1;
    this.documents = [];
  }

  async create(values: object): Promise<T> {
    const now = new Date();
    const newDocument: any = {
      ...values,
      id: this.counter,
      createdAt: now,
      updatedAt: now,
    };
    this.documents.push(newDocument);
    this.counter++;
    return newDocument;
  }

  async findOne(query: any): Promise<T|null> {
    const attributes = Object.keys(query);
    const result = this.documents.find((document) => {
      return attributes.every((attribute) => document[attribute] === query[attribute]);
    });
    if (result === undefined) {
      return null;
    } else {
      return result;
    }
  }

  findById(id: IDType): Promise<T|null> {
    return this.findOne({ id, });
  }

  async isAvailable(query: object): Promise<boolean> {
    try {
      const doc = await this.findOne(query);
      if (doc) {
        // is not available, the document exists.
        return false;
      } else {
        return true;
      }
    } catch (error) {
      throw error;
    }
  }

  delete(query: object): Promise<number> {
    throw new Error("Method not implemented.");
  }
}

export class RepositoryMockFactory {
  static getRepository<T extends IEntities>() {
    return new RepositoryMock<T>();
  }
}