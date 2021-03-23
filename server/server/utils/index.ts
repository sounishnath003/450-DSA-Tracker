export const OK: number = 200;
export const NOT_FOUND: number = 400;
export const INTERNAL_SERVER_ERROR: number = 500;
export const FORBIDDEN: number = 403;

export function getUserIdFromRequestHeader(req: any): string {
  return req.oidc.user.sub.split("|")[1];
}
