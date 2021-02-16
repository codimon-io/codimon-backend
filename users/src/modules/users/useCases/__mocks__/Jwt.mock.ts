import { IDType } from "../../../shared/entities/types";
import { IJwt } from "../sharedPorts/IJwt";

export class JwtMock implements IJwt {

  create(userId: IDType): string {
    return JSON.stringify({ userId, });
  }
  decode(token: string): { userId: IDType; } {
    const decoded = JSON.parse(token);
    return {
      userId: decoded.userId,
    };
  }
}