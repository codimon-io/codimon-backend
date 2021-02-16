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
import { UsersRepositoryFactory} from "../adapters/gateways/UsersRepositoryFactory";

chai.use(chaiHttp);

describe("Signup integration test suit", () => {
  let requester: ChaiHttp.Agent;
  const server = new ExpressApp();
  server.Start();

  beforeAll( async (done) => {
    requester = chai.request(server.app).keepOpen();
    const usersRepository = UsersRepositoryFactory.getRepository();
    await usersRepository.delete({ name: "[users::signup] name" });
    done();
  });

  afterAll(done => {
    requester.close(done);
  });

  describe("POST /signup", () => {
    it("should register the new user.", async (done) => {
      const res = await requester
        .post("/users/signup").send({
          name: "[users::signup] name",
          email: "signup@email.com",
          password: "password",
        });
        expect(res.status).toEqual(201);
        expect(typeof res.body.token).toEqual("string");
        done();
    });
  });
});