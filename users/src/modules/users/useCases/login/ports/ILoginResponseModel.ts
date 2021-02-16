export interface ILoginResponseModel {
  resolve(token: string): void;
  userDoesntExist(): void;
  passwordInvalid(): void;
}