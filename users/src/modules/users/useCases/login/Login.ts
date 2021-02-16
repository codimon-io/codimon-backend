import { IUsersRepository } from "../sharedPorts/IUsersRepository";
import { IBcrypt } from "../sharedPorts/IBcrypt";
import { IJwt } from "../sharedPorts/IJwt";
import { ILoginRequestModel } from "./ports/ILoginRequestModel";
import { ILoginResponseModel } from "./ports/ILoginResponseModel";
import { Users } from "../../entities/Users";

export class Login {
  constructor(
    private usersRepository: IUsersRepository,
    private bcrypt: IBcrypt,
    private jwt: IJwt,
    private responseModel: ILoginResponseModel,
  ) {}

  async execute(requestModel: ILoginRequestModel): Promise<void> {
    try {
      const doc = await this.usersRepository.findOne({ email: requestModel.email });
      if (doc)  {
        const user = new Users(doc);
        const isCorrect = await this.bcrypt.verify(user, requestModel.password);
        if (isCorrect) {
          const token = this.jwt.create(user.id);
          this.responseModel.resolve(token);
        } else {
          this.responseModel.passwordInvalid();
        }
      } else {
        this.responseModel.userDoesntExist();
      }
      return;
    } catch (error) {
      throw error;
    }
  }
}