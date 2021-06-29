import createHttpError from "http-errors";
import { verify } from "jsonwebtoken";
import { User } from "../../../database/schema/users.schema";
import {
  JWT_ACCESS_SECRET,
  Next,
  RequestInterface,
  ResponseInterface,
} from "../../utils";

export async function requiresAuth(
  req: RequestInterface,
  res: ResponseInterface,
  next: Next
) {
  try {
    const accessToken: string = req.cookies.accessToken;
    const isLoggedIn: boolean = req.cookies.isLoggedIn as boolean;

    if (isLoggedIn === false || !accessToken)
      throw new createHttpError.Unauthorized(
        "You are not authorized! Please Login again!"
      );

    const verifiedToken = (await verifyTokenValidity(accessToken)) as {
      userId: string;
    };

    if (!verifiedToken.userId) {
      throw new createHttpError.Forbidden(
        "Access Token expired and logged out! Please Login again"
      );
    }

    const userExists = await User.findById(verifiedToken.userId);

    if (userExists === null)
      throw createHttpError(401, "User is not registered!!");

    (req as any).userId = userExists._id;
    next();
  } catch (error) {
    next(error);
  }
}

async function verifyTokenValidity(accessToken: string) {
  return verify(accessToken, JWT_ACCESS_SECRET);
}
