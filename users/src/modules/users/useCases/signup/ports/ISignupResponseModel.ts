export interface ISignupResponseModel {
  resolve(token: string): void;
  userExists(): void;
}