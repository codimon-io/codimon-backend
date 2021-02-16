import bcrypt from "bcryptjs";

import { IBcrypt } from "../../useCases/sharedPorts/IBcrypt";
import { IUsers } from "../../entities/IUsers";

export class Bcrypt implements IBcrypt {

  async hash(password: string): Promise<string> {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (error) {
      throw error;
    }
  }

  async verify(user: IUsers, password: string): Promise<boolean> {
    try {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }
}