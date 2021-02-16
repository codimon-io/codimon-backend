import { IBcrypt } from "../sharedPorts/IBcrypt";
import { IUsers } from "../../entities/IUsers";

export class BcryptMock implements IBcrypt {
  async hash(password: string): Promise<string> {
    return `**${password}**`;
  }
  async verify(user: IUsers, password: string): Promise<boolean> {
    if (`**${password}**` === user.password) {
      return true;
    } else {
      return false;
    }
  }
}