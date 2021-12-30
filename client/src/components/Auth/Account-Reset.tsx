import React from "react";
import { useAuth } from "../../context/AuthContext";

interface PayloadInterface {
  username: string;
  newpassword: string;
  resetProgress: boolean;
}

function AccountReset({
  setSignupPressed,
  setAccountResetPressed,
}: any): JSX.Element {
  const { accountReset } = useAuth();

  const [payload, setPayload] = React.useState<PayloadInterface>({
    username: "",
    newpassword: "",
    resetProgress: false,
  });

  function handleChange(e: any) {
    setPayload((prevState: PayloadInterface) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  }

  if (accountReset === undefined) return <> </>;

  return (
    <React.Fragment>
      <div id="__account_reset_box">
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
                value={payload.newpassword}
                id="newpassword"
                name="newpassword"
                type="password"
                autoComplete="current-newpassword"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="New Password"
              />
            </div>
            {/** SPACE TO ADD CHECKBOX FOR RESET PROGRESS */}
          </div>

          <div
            onClick={() =>
              accountReset({
                username: payload.username,
                newpassword: payload.newpassword,
                resetProgress: payload.resetProgress,
              })
            }
            className="text-xl w-30 items-center content-center font-thin text-gray-800- m-auto px-6 py-2 rounded cursor-pointer border  bg-pink-600 hover:bg-pink-700 text-white hover:shadow-xl"
          >
            <div className="m-auto text-sm tracking-wide md:text-base text-center">
              Reset account &rarr;{" "}
            </div>
          </div>
        </div>

        <div className="my-4 text-center flex space-x-3 text-sm">
          <div>
            Don't have an account?{" "}
            <span
              onClick={() => setAccountResetPressed((state: boolean) => !state)}
              className="text-blue-600 cursor-pointer"
            >
              Login
            </span>{" "}
          </div>
          <div className="flex-1"> | </div>
          <div
            className="text-green-600 border-b-2 border-green-400 hover:bg-green-100 px-3 rounded-md bg-green-50 cursor-pointer"
            onClick={() => setAccountResetPressed((state: boolean) => !state)}
          >
            {" "}
            &larr; Go back{" "}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AccountReset;
