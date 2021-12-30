import { default as Cookie, default as Cookies } from "js-cookie";
import React from "react";
import { ActionType } from "../../reducer/action-type";
import { authReducer, initialState } from "../../reducer/auth.reducer";

interface useHookInterface {
  authState: { error: any; isLoggedIn: boolean; message: string | null };
  dispatch: React.Dispatch<ActionType>;
  loginWithRedirect: (payload: {
    username: string;
    password: string;
  }) => Promise<void>;
  dismiss: (callback: Function, seconds: number) => void;
  signupWithRedirect: (payload: {
    username: string;
    password: string;
  }) => Promise<void>;
  accountReset: (payload: {
    username: string;
    newpassword: string;
    resetProgress: boolean;
  }) => Promise<void>;
}

export const useHook = (): useHookInterface => {
  const [authState, dispatch] = React.useReducer(authReducer, initialState);

  React.useEffect(() => {
    const isAuthenticated = Cookie.get("isAuthenticated");
    if (isAuthenticated === "true") {
      dispatch({ type: "LOGIN" });
      dismiss(() => dispatch({ type: "RESET" }), 3);
    }
  }, []);

  function dismiss(callback: Function, seconds: number) {
    setTimeout(() => callback(), seconds * 1000);
  }

  async function loginWithRedirect(payload: {
    username: string;
    password: string;
  }) {
    const resp = await (
      await fetch(`/proxy/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      })
    ).json();
    if (resp.error) {
      dispatch({ type: "ERROR", payload: resp.error.message });
    } else {
      Cookies.set("isAuthenticated", "true", {
        expires: new Date(new Date().getTime() + 1000 * 3600 * 24),
        sameSite: "None",
        secure: true,
      });
      dispatch({ type: "LOGIN", payload: resp });
    }
    dismiss(() => dispatch({ type: "RESET" }), 3);
  }

  async function signupWithRedirect(payload: {
    username: string;
    password: string;
  }) {
    const resp = await (
      await fetch(`/proxy/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      })
    ).json();
    if (resp.error) {
      dispatch({ type: "ERROR", payload: resp.error.message });
    } else {
      Cookies.set("isAuthenticated", "true", {
        expires: new Date(new Date().getTime() + 1000 * 3600 * 24),
        sameSite: "None",
        secure: true,
      });
      dispatch({ type: "LOGIN", payload: resp });
    }
    dismiss(() => dispatch({ type: "RESET" }), 3);
  }

  async function accountReset(payload: {
    username: string;
    newpassword: string;
    resetProgress: boolean;
  }) {
    console.log("we are going to reset your account");

    const resp = await (
      await fetch(`/proxy/api/auth/account/reset`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      })
    ).json();

    if (resp.error) {
      dispatch({ type: "ERROR", payload: resp.error.message });
    } else {
      Cookies.set("isAuthenticated", "true", {
        expires: new Date(new Date().getTime() + 1000 * 3600 * 24),
        sameSite: "None",
        secure: true,
      });
      dispatch({ type: "LOGIN", payload: resp });
    }
    dismiss(() => dispatch({ type: "RESET" }), 3);
    console.log("account reset successfully");
  }

  return {
    authState,
    dispatch,
    loginWithRedirect,
    dismiss,
    signupWithRedirect,
    accountReset,
  };
};
