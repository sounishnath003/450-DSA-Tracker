import React from "react";
import {initialQuestionData, QuestionDataState, questionReducer} from "../../reducer/question-data.context";
import env from '../../env';
import {Error, Sucess} from "../../components/Alert";
import {AllTopicQuestionResponse} from "../../interfaces";
import Loader from "../../components/Loader";
import HomeRoot from "../../components/HomeRoot";

const QuestionContext = React.createContext<QuestionDataState>({...initialQuestionData});

export const useQuestion = () => React.useContext(QuestionContext);

interface QuestionProps {
    children: any
}

export const QuestionsProvider: React.FC<QuestionProps> = ({children}: QuestionProps): JSX.Element => {
    const [allQuestionDataState, dispatch] = React.useReducer(questionReducer, initialQuestionData);

    function dismiss(callback: Function, seconds: number) {
        setTimeout(() => {
            callback()
        }, seconds * 1000);
    }


    async function getAllQuestions(abortController: AbortController) {
        dispatch({type: "LOADING"});
        const resp: AllTopicQuestionResponse = await (await fetch(`${env.API_URL}/api/questions/all`, {
            credentials: "include",
            signal: abortController.signal
        })).json();
        if (resp.error) {
            dispatch({type: "ERROR", payload: resp.error.message})
            dismiss(() => dispatch({type: "RESET"}), 5);
        } else {
            dispatch({type: "GET_ALL_QUESTIONS", payload: resp});
        }
    }

    React.useEffect(() => {
        const abortController: AbortController = new AbortController();
        getAllQuestions(abortController);
        return () => abortController.abort();
    }, [])

    return (
        <QuestionContext.Provider value={{...allQuestionDataState, dispatch, dismiss}}>
            <Error error={allQuestionDataState.error}/>
            <Sucess message={allQuestionDataState.message}/>
            {children}
            {allQuestionDataState.loading ? <Loader/> : <HomeRoot/>}
        </QuestionContext.Provider>
    )
}