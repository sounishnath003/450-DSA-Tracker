import createHttpError from "http-errors";
import {NextFunction , Request as RQ , Response as RS ,} from "express-serve-static-core";
import {v4} from "uuid";
import environment from "dotenv";

environment.config ();

/** Required Types for Express.TS */
export type RequestInterface = RQ;
export type ResponseInterface = RS;
export type Next = NextFunction;
export const createError = createHttpError;


/** Utility functions */
export const SUCCESS = {status :true , statusCode :200};
export const uuid = v4;

/** Auth Environment Token SECRETS */
export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET as string;
export const JWT_REFRESH_SECRET = process.env
    .JWT_REFRESH_TOKEN_SECRET as string;

