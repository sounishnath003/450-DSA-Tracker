import createHttpError from "http-errors";
import {
  NextFunction,
  Request as RQ,
  Response as RS,
} from "express-serve-static-core";
import { v4 } from "uuid";
import environment from "dotenv";
import { genSaltSync, hashSync } from "bcrypt";
import { sign } from "jsonwebtoken";

environment.config();

/** Required Types for Express.TS */
export type RequestInterface = RQ;
export type ResponseInterface = RS;
export type Next = NextFunction;
export const createError = createHttpError;

/** Utility functions */
export const SUCCESS = { status: true, statusCode: 200 };
export const uuid = v4;

/** Auth Environment Token SECRETS */
export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET as string;
export const JWT_REFRESH_SECRET = process.env
  .JWT_REFRESH_TOKEN_SECRET as string;

export const DATABASE_URI = process.env.DATABASE_URI as string;

/** Generate Bcrypt */
export const generateHashedPassword = (password: string) =>
  hashSync(password, genSaltSync(10));

/** generate AccessToken */
export function generateAccessToken(userId: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const payload = { userId };
      const token: string = sign(payload, JWT_ACCESS_SECRET, {
        expiresIn: "1d",
        audience: userId,
      });

      resolve(token);
    } catch (error) {
      reject(error);
    }
  });
}
