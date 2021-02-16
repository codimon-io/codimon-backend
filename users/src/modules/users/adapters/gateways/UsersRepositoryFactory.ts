import { MySqlUsersRepository } from "./MySqlUsersRepository";

export class UsersRepositoryFactory {
  static getRepository() {
    return new MySqlUsersRepository();
  }
}