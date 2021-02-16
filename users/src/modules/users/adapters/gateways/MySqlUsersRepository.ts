import { MySqlBaseRepository } from "../../../shared/adapters/gateways/MySqlBaseRepository";
import { IUsers } from "../../entities/IUsers";
import { IUsersRepository } from "../../useCases/sharedPorts/IUsersRepository";

export class MySqlUsersRepository extends MySqlBaseRepository<IUsers> implements IUsersRepository {
  readonly tableName: string = "users_users";

  create(values: { name: string; email: string; password: string; }): Promise<IUsers> {
    try {
      return super._create(values);
    } catch (error) {
      throw error;
    }
  }
}