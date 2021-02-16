import { ISignupResponseModel  } from "../../useCases/signup/ports/ISignupResponseModel";
import { ViewModel } from "../../../shared/adapters/viewModel/ViewModel";

export class SignupPresenter implements ISignupResponseModel {
  constructor(private viewModel: ViewModel) {}

  resolve(token: string): void {
    this.viewModel.resolveCreated201({ token });
  }
  userExists(): void {
    this.viewModel.rejectConflict409("The email is already registered.");
  }
}