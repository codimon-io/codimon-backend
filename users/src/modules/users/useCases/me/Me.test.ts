import { Me } from "./Me";
import { IUsers } from "../../entities/IUsers";
import { RepositoryMock } from "../../../shared/__mocks__/Repository.mock";
import { JwtMock } from "../__mocks__/Jwt.mock";
import { IDType } from "../../../shared/entities/types";
import { IMeResponseModel } from "./ports/IMeResponseModel";

export class PresenterMock implements IMeResponseModel {
  result: any;

  resolve(
    user: {
      id: IDType;
      name: string;
      email: string;
    },
    token: string
  ): void {
    this.result = {
      user,
      token
    };
  }

  userDoesntExist(): void {
    this.result = "user doesn\'t exist";
  }
}

describe("Me useCase. unit", () => {
  it("should returns the user data.", async () => {
    const usersRepository = new RepositoryMock<IUsers>();
    usersRepository.create({
      name: "grover",
      email: "grover@email.com",
      password: "**1234**",
    });
    const jwt = new JwtMock();
    const requestModel = {
      userId: 1,
    };
    const presenter = new PresenterMock();
    const me = new Me(usersRepository, jwt, presenter);
    await me.execute(requestModel);
    expect(typeof presenter.result).toBe("object");
    expect(typeof presenter.result.token).toBe("string");
    expect(presenter.result.token).toBe("{\"userId\":1}");
  });

  it("shouldn\'t returns a user data.", async () => {
    const usersRepository = new RepositoryMock<IUsers>();
    const jwt = new JwtMock();
    const requestModel = {
      userId: 1,
    };
    const presenter = new PresenterMock();
    const me = new Me(usersRepository, jwt, presenter);
    await me.execute(requestModel);
    expect(typeof presenter.result).toBe("string");
    expect(presenter.result).toBe("user doesn\'t exist");
  });
});