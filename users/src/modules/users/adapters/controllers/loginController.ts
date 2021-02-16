import { Request, Response, NextFunction } from "express";
import { Login } from "../../useCases/login/Login";
import { IUsersRepository } from "../../useCases/sharedPorts/IUsersRepository";
import { ILoginRequestModel } from "../../useCases/login/ports/ILoginRequestModel";
import { LoginPresenter } from "../presenters/LoginPresenter";
import { ViewModel } from "../../../shared/adapters/viewModel/ViewModel";
import { UsersRepositoryFactory } from "../gateways/UsersRepositoryFactory";
import { Bcrypt } from "../bcrypt/Bcrypt";
import { Jwt } from "../jwt/Jwt";

// tslint:disable-next-line:no-shadowed-variable
export const controller = (usersRepository: IUsersRepository) => {
  return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password, } = request.body;
      const requestModel: ILoginRequestModel = {
        email,
        password,
      };
      const bcrypt = new Bcrypt();
      const jwt = new Jwt();
      const viewModel = new ViewModel(response);
      const presenter = new LoginPresenter(viewModel);
      const login = new Login(usersRepository, bcrypt, jwt, presenter);
      await login.execute(requestModel);
    } catch (error) {
      next(error);
    }
  }
}

export const loginController = controller(UsersRepositoryFactory.getRepository());