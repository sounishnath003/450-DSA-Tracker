import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { AuthContext, useAuth } from "../../context/AuthContext";

interface PayloadInterface {
  username: string;
  password: string;
}

function AuthHome() {
  const [signupPressed, setSignupPressed] = React.useState<boolean>(false);

  const [payload, setPayload] = React.useState<PayloadInterface>({
    username: "",
    password: "",
  });
  const { loginWithRedirect, signUpWithRedirect } = useAuth();

  function handleChange(e: any) {
    setPayload((prevState: PayloadInterface) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  }

  return (
    <div className="bg-blue-50 h-screen flex">
      <div className="max-w-md m-auto">
        <div className="my-3">
          <div className="md:text-5xl text-3xl text-center my-3 text-gray-800">
            450 DSA Tracker
          </div>

          <p className="text-center text-sm text-gray-600">
            ⚡ Boosts up your Data structure and Algorithms Skills.
          </p>
        </div>

        <div className="my-8 space-y-6">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                onChange={handleChange}
                value={payload.username}
                id="username"
                name="username"
                type="username"
                autoComplete="username"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                onChange={handleChange}
                value={payload.password}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
        </div>

        {!signupPressed ? (
          <div
            onClick={() => loginWithRedirect(payload)}
            className="text-xl w-30 items-center content-center font-thin text-gray-800- m-auto px-6 py-2 rounded cursor-pointer border  bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-xl"
          >
            <div className="m-auto text-sm tracking-wide md:text-base text-center">
              Login &rarr;{" "}
            </div>
          </div>
        ) : (
          <div
            onClick={() => signUpWithRedirect(payload)}
            className="text-xl w-30 items-center content-center font-thin text-gray-800- m-auto px-6 py-2 rounded cursor-pointer border  bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-xl"
          >
            <div className="m-auto text-sm tracking-wide md:text-base text-center">
              Signup &rarr;{" "}
            </div>
          </div>
        )}

        <div className="my-4 text-center">
          <div className="text-sm">
            Don't have an account?{" "}
            <span
              onClick={() => setSignupPressed((state: boolean) => !state)}
              className="text-blue-600 cursor-pointer"
            >
              Signup
            </span>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthHome;
