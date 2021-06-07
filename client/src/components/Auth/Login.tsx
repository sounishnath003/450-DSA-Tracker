import {useAuth0} from "@auth0/auth0-react";
import React from "react";

function AuthHome() {
    // const { loginWithRedirect } = useAuth0();

    async function loginWithRedirect() {
        const resp = await (await fetch('http://localhost:5000/login')).json();
        console.log({resp});
    }

    return (
        <div className="bg-blue-50 h-screen flex">
            <div onClick={() => loginWithRedirect ()} className="max-w-md m-auto">
                <div className="md:text-5xl text-3xl text-center my-6 text-gray-800">
                    450 DSA Tracker
                </div>
                <div
                    className="text-xl w-48 items-center content-center font-thin text-gray-800- m-auto px-6 py-2 rounded cursor-pointer border  bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-xl">
                    <div className="m-auto text-sm tracking-wide md:text-base text-center">
                        Login / Register &rarr;{" "}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthHome;
