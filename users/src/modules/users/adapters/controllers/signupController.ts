import { Request, Response, NextFunction } from "express";
import { Signup } from "../../useCases/signup/Signup";
import { IUsersRepository } from "../../useCases/sharedPorts/IUsersRepository";
import { ISignupRequestModel } from "../../useCases/signup/ports/ISignupRequestModel";
import { SignupPresenter } from "../presenters/SignupPresenter";
import { ViewModel } from "../../../shared/adapters/viewModel/ViewModel";
import { UsersRepositoryFactory } from "../gateways/UsersRepositoryFactory";
import { Bcrypt } from "../bcrypt/Bcrypt";
import { Jwt } from "../jwt/Jwt";

// tslint:disable-next-line:no-shadowed-variable
export const controller = (usersRepository: IUsersRepository) => {
  return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, email, password, } = request.body;
      const requestModel: ISignupRequestModel = {
        name,
        email,
        password,
      };
      const bcrypt = new Bcrypt();
      const jwt = new Jwt();
      const viewModel = new ViewModel(response);
      const presenter = new SignupPresenter(viewModel);
      const signup = new Signup(usersRepository, bcrypt, jwt, presenter);
      await signup.execute(requestModel);
    } catch (error) {
      next(error);
    }
  }
}

export const signupController = controller(UsersRepositoryFactory.getRepository());