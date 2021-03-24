import auth0 from "./auth0-cred.json";

// appState && appState.returnTo ? appState.returnTo : window.location.pathname
// !! Things are suprimed erroish | use by reference
// const onRedirectCallback = (appState: any) => {
//   history.push(
//     appState && appState.returnTo
//       ? window.location.origin
//       : window.location.pathname
//   );
// };

export const providerConfig = {
  domain: auth0.domain,
  clientId: auth0.clientId,
  audience: auth0.audience,
  scope: auth0.scope,
};
