import { createBrowserHistory } from "history";
import auth0 from "./auth0-cred.json";

const history = createBrowserHistory();

// appState && appState.returnTo ? appState.returnTo : window.location.pathname
const onRedirectCallback = (appState: any) => {
  history.push(
    appState && appState.returnTo
      ? window.location.origin
      : window.location.pathname
  );
};

export const providerConfig = {
  domain: auth0.domain,
  clientId: auth0.clientId,
  redirectUri: window.location.origin,
  audience: auth0.audience,
  scope: auth0.scope,
  onRedirectCallback,
};
