import { IUsersRepository } from "../sharedPorts/IUsersRepository";
import { IJwt } from "../sharedPorts/IJwt";
import { IMeRequestModel } from "./ports/IMeRequestModel";
import { IMeResponseModel } from "./ports/IMeResponseModel";

export class Me {
  constructor(
    private usersRepository: IUsersRepository,
    private jwt: IJwt,
    private response: IMeResponseModel,
  ) {}

  async execute(requestModel: IMeRequestModel): Promise<void> {
    try {
      const { userId } = requestModel;
      const user = await this.usersRepository.findById(userId);
      if (user) {
        const token = this.jwt.create(userId);
        this.response.resolve({
          id: user.id,
          name: user.name,
          email: user.email,
        }, token);
      } else {
        this.response.userDoesntExist();
      }
      return;
    } catch (error) {
      throw error;
    }
  }
}