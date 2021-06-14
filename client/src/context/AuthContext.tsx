import React from "react";
import { Error } from "../components/Alert";
import Success from "../components/Alert/Success";

interface AuthContextState {
  isLoggedIn: boolean;
  error: string | null;
  message: string | null;
  loginWithRedirect: Function;
  signUpWithRedirect: Function;
  logout: Function;
}

const initalAuthState: AuthContextState = {
  isLoggedIn: false,
  error: null,
  message: null,
  loginWithRedirect: (payload: any) => {},
  signUpWithRedirect: (payload: any) => {},
  logout: () => {},
};

export const AuthContext =
  React.createContext<AuthContextState>(initalAuthState);

export const useAuth = () => React.useContext(AuthContext);

/** AuthProvider Context Component */
interface AuthProviderProps {
  children: any;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
}: AuthProviderProps) => {
  const [error, setError] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);

  function disappear(callback: any, seconds: number) {
    setTimeout(() => {
      callback;
    }, seconds * 1000);
  }

  async function loginWithRedirect(payload: {
    username: string;
    password: string;
  }) {
    if (payload.username && payload.password) {
      const resp = await (
        await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          body: JSON.stringify(payload),
        })
      ).json();

      if (resp.error) {
        setError((error) => (error = resp.error.message as string));
        return;
      }

      setMessage((message) => (message = resp.message));
      console.log({ resp });
    }
  }

  async function signUpWithRedirect(payload: {
    username: string;
    password: string;
  }) {
    try {
      const resp = await (
        await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          body: JSON.stringify(payload),
        })
      ).json();

      if (resp.error) {
        setError((error) => (error = resp.error.message as string));
        return;
      }

      disappear(
        setMessage((message) => (message = resp.message)),
        4
      );
      disappear(
        setIsLoggedIn((loggedIn) => (loggedIn = resp.isLoggedIn)),
        4
      );
      console.log({ resp });
    } catch (error) {
      disappear(setError("Some error occured while fetching! Hold on."), 4);
    }
  }

  async function logout() {
    try {
    } catch (error) {
      disappear(setError("Could not able to log you out!"), 4);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        loginWithRedirect,
        logout,
        error,
        message,
        signUpWithRedirect,
        isLoggedIn,
      }}
    >
      <Error error={error} />
      <Success message={message} />
      {children}
    </AuthContext.Provider>
  );
};
