import env from "../../env";
import React from "react";
import {authReducer, initialState} from "../../reducer/auth.reducer";
import Cookie from "js-cookie";
import {ActionType} from "../../reducer/action-type";

interface useHookInterface {
    authState: { error: any, isLoggedIn: boolean, message: string | null },
    dispatch: React.Dispatch<ActionType>,
    loginWithRedirect: (payload: { username: string, password: string }) => Promise<void>,
    dismiss: (callback: Function, seconds: number) => void,
    signupWithRedirect: (payload: { username: string, password: string }) => Promise<void>
}

export const useHook = (): useHookInterface => {
    const [authState, dispatch] = React.useReducer(authReducer, initialState);

    React.useEffect(() => {
        const isAuthenticated = Cookie.get('isAuthenticated');
        if (isAuthenticated === 'true') {
            dispatch({type: "LOGIN"});
            dismiss(() => dispatch({type: "RESET"}), 3);
        }
    }, []);

    function dismiss(callback: Function, seconds: number) {
        setTimeout(() => callback(), seconds * 1000);
    }

    async function loginWithRedirect(payload: {
        username: string;
        password: string;
    }) {
        const resp = await (await fetch(`${env.API_URL}/api/auth/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload),
            credentials: "include",
        })).json();
        if (resp.error) {
            dispatch({type: "ERROR", payload: resp.error.message});
        } else {
            dispatch({type: "LOGIN", payload: resp});
        }
        dismiss(() => dispatch({type: "RESET"}), 3);
    }

    async function signupWithRedirect(payload: {
        username: string;
        password: string;
    }) {
        const resp = await (await fetch(`${env.API_URL}/api/auth/signup`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload),
            credentials: "include",
        })).json();
        if (resp.error) {
            dispatch({type: "ERROR", payload: resp.error.message});
        } else {
            dispatch({type: "LOGIN", payload: resp});
        }
        dismiss(() => dispatch({type: "RESET"}), 3);
    }

    return {authState, dispatch, loginWithRedirect, dismiss, signupWithRedirect}
}