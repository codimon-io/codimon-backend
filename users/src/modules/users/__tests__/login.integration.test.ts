import dotenv from "dotenv";
import path from "path";

if (process?.env?.NODE_ENV==="test.local") {
  dotenv.config({
    path: path.resolve(process.cwd(), ".env.test"),
  });
} else {
  dotenv.config();
}

import chai from "chai";
import chaiHttp from "chai-http";
import { ExpressApp } from "../../../frameworks/express/ExpressApp";
import { UsersRepositoryFactory } from "../adapters/gateways/UsersRepositoryFactory";
import { Signup } from "../useCases/signup/Signup";
import { Bcrypt } from "../adapters/bcrypt/Bcrypt";
import { Jwt } from "../adapters/jwt/Jwt";
import { ISignupRequestModel } from "../useCases/signup/ports/ISignupRequestModel";
import { ISignupResponseModel } from "../useCases/signup/ports/ISignupResponseModel";

chai.use(chaiHttp);

describe("Login integration test suit", () => {
  let requester: ChaiHttp.Agent;
  const server = new ExpressApp();
  let _token: string;
  server.Start();

  beforeAll( async (done) => {
    requester = chai.request(server.app).keepOpen();
    const usersRepository = UsersRepositoryFactory.getRepository();
    await usersRepository.delete({ name: "[users::login] name" });
    const bcrypt = new Bcrypt();
    const jwt = new Jwt();
    const presenter: ISignupResponseModel = {
      resolve(token: string): void {
        _token = token;
      },
      // tslint:disable-next-line:no-empty
      userExists(): void {}
    };
    const signup = new Signup(
      usersRepository,
      bcrypt,
      jwt,
      presenter
    );
    const request: ISignupRequestModel = {
      name: "[users::login] name",
      email: "login@email.com",
      password: "password",
    };
    await signup.execute(request);
    done();
  });

  afterAll(done => {
    requester.close(done);
  });

  describe("POST /login", () => {
    it("should login a user.", async (done) => {
      const res = await requester
        .post("/users/login").send({
          email: "login@email.com",
          password: "password",
        });
        expect(res.status).toEqual(202);
        expect(typeof res.body.token).toEqual("string");
        done();
    });
  });
});