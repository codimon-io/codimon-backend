import pipe from "p-pipe";
import { Jwt } from "../../users/adapters/jwt/Jwt";

import { Request, Response } from "express";

interface IAuthenticationPayload {
  request: Request;
  response: Response;
  next: () => void;
  token: string;
  user: any;
}

async function pipeline(request: Request, response: Response, next: () => void) {
  try {
    const payload = await pipe(
      getToken,
      verifyToken,
    )({ request, response, next, token: null, user: null, });
    return payload;
  } catch (error) {
    throw error;
  }
}

/**
 * @param {object} payload
 * @returns {object} add the payload with the token.
 */
async function getToken(payload: IAuthenticationPayload) {
  const { request, response } = payload;
  let scheme = null;
  let token = null;
  if (request.headers && request.headers.authorization) {
    const parts = request.headers.authorization.split(" ");
    if (parts.length === 2) {
      scheme = parts[0];
      token = parts[1];
    }
  }
  return {
    ...payload,
    token,
  };
}

async function verifyToken(payload: IAuthenticationPayload) {
  try {
    const { token } = payload;
    let decodedToken: any = null;
    if (token) {
      const jwt = new Jwt();
      decodedToken = jwt.decode(token);
    }
    return {
      ...payload,
      user: decodedToken,
    };
  } catch (error) {
    throw error;
  }
}

export function authentication(request: any, response: Response, next: () => void) {
  pipeline(request, response, next)
  .then((payload: IAuthenticationPayload) => {
    const { user } = payload;
    if (user) {
      request.user = user;
      next();
    } else {
      response.status(401);
      response.end();
    }
  })
  .catch((error: any) => {
    response.status(401);
    response.end();
  });
}
