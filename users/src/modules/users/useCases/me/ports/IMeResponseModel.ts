import { IDType } from "../../../../shared/entities/types";

export interface IMeResponseModel {
  resolve(
    user: {
      id: IDType;
      name: string;
      email: string;
    },
    token: string
  ): void;
  userDoesntExist(): void;
}