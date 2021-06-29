import React from "react";
import { Error, Sucess } from "../../components/Alert";
import Container from "../../components/Container";
import HomeRoot from "../../components/HomeRoot";
import Loader from "../../components/Loader";
import {
  initialQuestionData,
  QuestionDataState,
} from "../../reducer/question-data.context.reducer";
import CategoryFilterProvider from "../CategoryContext";
import { useHook } from "./hooks";

const QuestionContext = React.createContext<QuestionDataState>({
  ...initialQuestionData,
});

export const useQuestion = () => React.useContext(QuestionContext);

interface QuestionProps {
  children: any;
}

export const QuestionsProvider: React.FC<QuestionProps> = ({
  children,
}: QuestionProps): JSX.Element => {
  const { allQuestionDataState, dismiss, dispatch } = useHook();
  return (
    <QuestionContext.Provider
      value={{ ...allQuestionDataState, dispatch, dismiss }}
    >
      <CategoryFilterProvider>
        <Error error={allQuestionDataState.error} />
        <Sucess message={allQuestionDataState.message} />
        {children}
        <Container>
          {allQuestionDataState.loading ? <Loader /> : <HomeRoot />}
        </Container>
      </CategoryFilterProvider>
    </QuestionContext.Provider>
  );
};
