import { IUsersRepository } from "../sharedPorts/IUsersRepository";
import { IBcrypt } from "../sharedPorts/IBcrypt";
import { IJwt } from "../sharedPorts/IJwt";
import { ISignupRequestModel } from "./ports/ISignupRequestModel";
import { ISignupResponseModel } from "./ports/ISignupResponseModel";

export class Signup {
  constructor(
    private usersRepository: IUsersRepository,
    private bcrypt: IBcrypt,
    private jwt: IJwt,
    private responseModel: ISignupResponseModel,
  ) {}

  async execute(requestModel: ISignupRequestModel): Promise<void> {
    try {
      const isAvailable = await this.usersRepository.isAvailable({ email: requestModel.email });
      if (isAvailable)  {
        const hashedPassword = await this.bcrypt.hash(requestModel.password);
        const user = await this.usersRepository.create({
          ...requestModel,
          password: hashedPassword,
        });
        const token = this.jwt.create(user.id);
        this.responseModel.resolve(token);
      } else {
        this.responseModel.userExists();
      }
      return;
    } catch (error) {
      throw error;
    }
  }
}