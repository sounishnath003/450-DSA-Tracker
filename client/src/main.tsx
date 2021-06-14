import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    {/* <Auth0Provider
      clientId={"qEDUv12CscBtA4tUEMiv9CHBlmZcX0cM"}
      domain={"dev-olv9gbvh.us.auth0.com"}
      redirectUri={window.location.origin}
    >
    </Auth0Provider> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
