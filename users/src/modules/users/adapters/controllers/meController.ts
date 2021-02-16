import { Request, Response, NextFunction } from "express";
import { Me } from "../../useCases/me/Me";
import { IUsersRepository } from "../../useCases/sharedPorts/IUsersRepository";
import { IMeRequestModel } from "../../useCases/me/ports/IMeRequestModel";
import { MePresenter } from "../presenters/MePresenter";
import { ViewModel } from "../../../shared/adapters/viewModel/ViewModel";
import { IAuthenticatedRequest } from "../../../shared/adapters/requestModel/AuthenticatedRequestModel";
import { UsersRepositoryFactory } from "../gateways/UsersRepositoryFactory";
import { Jwt } from "../jwt/Jwt";

// tslint:disable-next-line:no-shadowed-variable
export const controller = (usersRepository: IUsersRepository) => {
  return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { user } = request as IAuthenticatedRequest;
      const requestModel: IMeRequestModel = {
        userId: user.userId,
      };
      const jwt = new Jwt();
      const viewModel = new ViewModel(response);
      const presenter = new MePresenter(viewModel);
      const me = new Me(usersRepository, jwt, presenter);
      await me.execute(requestModel);
    } catch (error) {
      next(error);
    }
  }
}

export const meController = controller(UsersRepositoryFactory.getRepository());