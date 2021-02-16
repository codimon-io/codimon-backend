import { Signup } from "./Signup";
import { IUsers } from "../../entities/IUsers";
import { RepositoryMock } from "../../../shared/__mocks__/Repository.mock";
import { BcryptMock } from "../__mocks__/Bcrypt.mock";
import { JwtMock } from "../__mocks__/Jwt.mock";
import { ISignupResponseModel } from "./ports/ISignupResponseModel";

export class PresenterMock implements ISignupResponseModel {
  result: string;

  resolve(token: string): void {
    this.result = token;
  }
  userExists(): void {
    this.result = "the user exists";
  }
}

describe("Signup useCase unit", () => {
  it("should signup a new user.", async () => {
    const usersRepository = new RepositoryMock<IUsers>();
    const bcrypt = new BcryptMock();
    const jwt = new JwtMock();
    const presenter = new PresenterMock();
    const requestModel = {
      name: "grover",
      email: "grover@email.com",
      password: "1234",
    };
    const signup = new Signup(usersRepository, bcrypt, jwt, presenter);
    await signup.execute(requestModel);
    expect(typeof presenter.result).toBe("string");
    expect(presenter.result).toBe("{\"userId\":1}");
  });

  it("shouldn\'t signup a new user.", async () => {
    const usersRepository = new RepositoryMock<IUsers>();
    usersRepository.create({
      name: "grover",
      email: "grover@email.com",
      password: "**1234**",
    });
    const bcrypt = new BcryptMock();
    const jwt = new JwtMock();
    const presenter = new PresenterMock();
    const requestModel = {
      name: "grover",
      email: "grover@email.com",
      password: "1234",
    };
    const signup = new Signup(usersRepository, bcrypt, jwt, presenter);
    await signup.execute(requestModel);
    expect(typeof presenter.result).toBe("string");
    expect(presenter.result).toBe("the user exists");
  });
});