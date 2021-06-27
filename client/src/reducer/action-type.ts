export type LOGIN = "LOGIN";
export type ERROR = "ERROR";
export type RESET = "RESET";
export type GET_ALL_QUESTIONS = "GET_ALL_QUESTIONS";
export type LOADING = "LOADING";

export interface ActionType {
    type: LOGIN | ERROR | RESET | GET_ALL_QUESTIONS | LOADING;
    payload?: any;
}
