import {ActionType} from "./action-type";

interface AuthState {
    isLoggedIn: boolean;
    message: string | null;
    error: string | null;
}

export const initialState: AuthState = {
    isLoggedIn: false,
    message: null,
    error: null,
};

export function authReducer(
    state: AuthState = initialState,
    action: ActionType
) {
    switch (action.type) {
        case "LOGIN": {
            return {
                ...state,
                error: null,
                isLoggedIn: true,
                message: "You are successfully logged in!",
            };
        }

        case "ERROR": {
            return {
                ...state,
                error: action.payload,
            };
        }

        case "RESET": {
            return {
                ...state,
                error: null,
                message: null
            }
        }

        default:
            return state;
    }
}
