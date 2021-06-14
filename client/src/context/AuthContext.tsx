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
  const [authState, setAuthState] =
    React.useState<AuthContextState>(initalAuthState);

  function disappear(callback: any, seconds: number) {
    setTimeout(() => {
      callback();
    }, seconds * 1000);
  }

  async function loginWithRedirect(payload: {
    username: string;
    password: string;
  }) {
    if (payload.username.length > 0 && payload.password.length > 0) {
      const resp = await (
        await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          body: JSON.stringify(payload),
        })
      ).json();

      console.log(payload);
      console.log(resp);
      

      if (resp.error) {
        setAuthState({ ...authState, error: resp.error.message as string });
        disappear(() => setAuthState({ ...authState, error: null }), 3);
        return;
      }

      setAuthState({ ...authState, message: resp.message });
      disappear(() => setAuthState({ ...authState, message: null }), 3);
      console.log({ resp });
    } else {
      setAuthState({
        ...authState,
        error: "Username / Password fields are empty!",
      });
      disappear(() => setAuthState({ ...authState, error: null }), 3);
    }
  }

  async function signUpWithRedirect(payload: {
    username: string;
    password: string;
  }) {
    try {
      const resp = await (
        await fetch("http://localhost:5000/api/auth/signup", {
          method: "POST",
          body: JSON.stringify(payload),
        })
      ).json();

      if (resp.error) {
        setAuthState({ ...authState, error: resp.error.message as string });
        disappear(() => setAuthState({ ...authState, error: null }), 3);
        return;
      }

      setAuthState({ ...authState, message: resp.message });
      disappear(() => setAuthState({ ...authState, message: null }), 3);
      console.log({ resp });
    } catch (error) {
      setAuthState({
        ...authState,
        error: "Some error occured while fetching! Hold on.",
      });
      disappear(() => setAuthState({ ...authState, error: null }), 3);
    }
  }

  async function logout() {
    try {
    } catch (error) {
      setAuthState({ ...authState, error: "Could not able to log you out!" });
      disappear(() => setAuthState({ ...authState, error: null }), 3);
    }
  }

  return (
    <AuthContext.Provider
      value={{ ...authState, loginWithRedirect, logout, signUpWithRedirect }}
    >
      <Error error={authState.error} />
      <Success message={authState.message} />
      {children}
    </AuthContext.Provider>
  );
};
