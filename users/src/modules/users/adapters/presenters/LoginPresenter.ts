import { ILoginResponseModel  } from "../../useCases/login/ports/ILoginResponseModel";
import { ViewModel } from "../../../shared/adapters/viewModel/ViewModel";

export class LoginPresenter implements ILoginResponseModel {
  constructor(private viewModel: ViewModel) {}

  resolve(token: string): void {
    this.viewModel.resolveAccepted202({ token });
  }
  userDoesntExist(): void {
    this.viewModel.rejectUnauthorized401("The email doesn\'t exist.");
  }
  passwordInvalid(): void {
    this.viewModel.rejectUnauthorized401("The password is not correct.");
  }
}