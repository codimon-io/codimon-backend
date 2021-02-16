import { Login } from "./Login";
import { IUsers } from "../../entities/IUsers";
import { RepositoryMock } from "../../../shared/__mocks__/Repository.mock";
import { BcryptMock } from "../__mocks__/Bcrypt.mock";
import { JwtMock } from "../__mocks__/Jwt.mock";
import { ILoginResponseModel } from "./ports/ILoginResponseModel";

class PresenterMock implements ILoginResponseModel {
  result: string;

  resolve(token: string): void {
    this.result = token;
  }

  userDoesntExist(): void {
    this.result = "the user doesn\'t exist";
  }

  passwordInvalid(): void {
    this.result = "the password is not correct";
  }
}

describe("Login useCase. unit", () => {
  it("should login the user.", async () => {
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
      email: "grover@email.com",
      password: "1234",
    };
    const login = new Login(usersRepository, bcrypt, jwt, presenter);
    await login.execute(requestModel);
    expect(typeof presenter.result).toBe("string");
    expect(presenter.result).toBe("{\"userId\":1}");
  });

  it("shouldn\'t login the user. the user doesn\'t exist", async () => {
    const usersRepository = new RepositoryMock<IUsers>();
    const bcrypt = new BcryptMock();
    const jwt = new JwtMock();
    const presenter = new PresenterMock();
    const requestModel = {
      email: "grover@email.com",
      password: "1234",
    };
    const login = new Login(usersRepository, bcrypt, jwt, presenter);
    await login.execute(requestModel);
    expect(typeof presenter.result).toBe("string");
    expect(presenter.result).toBe("the user doesn\'t exist");
  });

  it("shouldn\'t login the user. the password is not correct", async () => {
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
      email: "grover@email.com",
      password: "1235",
    };
    const login = new Login(usersRepository, bcrypt, jwt, presenter);
    await login.execute(requestModel);
    expect(typeof presenter.result).toBe("string");
    expect(presenter.result).toBe("the password is not correct");
  });
});