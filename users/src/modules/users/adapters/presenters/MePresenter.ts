import { IMeResponseModel  } from "../../useCases/me/ports/IMeResponseModel";
import { ViewModel } from "../../../shared/adapters/viewModel/ViewModel";

export class MePresenter implements IMeResponseModel {
  constructor(private viewModel: ViewModel) {}

  resolve(user: { id: number; name: string; email: string; }, token: string): void {
    this.viewModel.resolveAccepted202({ user, token, });
  }
  userDoesntExist(): void {
    this.viewModel.rejectConflict409("The user doesn\'t exist.");
  }
}