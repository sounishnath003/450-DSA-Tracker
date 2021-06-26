import auth0 from "./auth0-cred";

export const providerConfig = {
  domain: auth0.domain,
  clientId: auth0.clientId,
  audience: auth0.audience,
  scope: auth0.scope,
};
