import React from "react";
import { IQuestion, IQuestionData } from "../../Backend/model/Question-model";
import { useQuestion } from "../../context/QuestionContext";
import { RouterMapTopicName } from "../../routes";

export function useHook() {
  const {
    allQuestions,
    totalSolvedQuestion,
    selectedTopic,
    selectedTopicQuestions,
    dispatch,
    dismiss,
  } = useQuestion();
  const pathname: string = decodeURI(window.location.pathname).split("/")[1];
  const [searchText, setSearchText] = React.useState<string>("");

  async function feedSelectQuestionData(abortController: AbortController) {
    const resp = await (
      await fetch(
        `/proxy/api/questions/topic/${
          (RouterMapTopicName as never)[pathname]
        }`,
        {
          credentials: "include",
          signal: abortController.signal,
        }
      )
    ).json();
    if (resp.error) {
      dispatch({ type: "ERROR", payload: resp.error.message });
    } else {
      dispatch({
        type: "SELECT_QUESTION_TOPIC",
        payload: {
          index: resp.questions[0].position,
          questionTopic: { ...resp.questions[0] },
        },
      });
    }
  }

  React.useEffect(() => {
    const abortController: AbortController = new AbortController();
    if (selectedTopic === null) feedSelectQuestionData(abortController);
    return () => abortController.abort();
  }, []);

  function whenPressedCheckBox(question: IQuestion, quesIndex: number) {
    return async function () {
      if (selectedTopicQuestions !== null && selectedTopic !== null) {
        let doneCount = question.Done ? -1 : 1;
        const updatedQuestion: IQuestion = {
          ...question,
          Done: !question.Done,
        };

        const totalQuestionSolved: number = totalSolvedQuestion + doneCount;
        const updatedSelectedQuestionList: IQuestion[] =
          selectedTopicQuestions?.map(
            (selectedQuestion: IQuestion, sIdx: number) => {
              if (selectedQuestion.Done) doneCount++;
              if (sIdx === quesIndex) {
                return updatedQuestion;
              } else {
                return selectedQuestion;
              }
            }
          );
        const finalPayload: IQuestionData[] = allQuestions.map(
          (questionTopic: IQuestionData) => {
            if (selectedTopic === questionTopic.topicName) {
              return {
                ...questionTopic,
                questions: [...updatedSelectedQuestionList],
                doneQuestions: doneCount,
                started: doneCount > 0 ? true : false,
              };
            } else {
              return questionTopic;
            }
          }
        );

        const resp = await (
          await fetch(`/proxy/api/questions/update-progress`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(finalPayload),
          })
        ).json();

        if (resp.error) {
          dispatch({ type: "ERROR", payload: resp.error.message });
          dismiss(() => dispatch({ type: "RESET" }), 3);
          if (resp.error.status === 401) window.location.reload();
        } else {
          dispatch({
            type: "UPDATE_PROGRESS",
            payload: {
              message: resp.message,
              allQuestions: finalPayload,
              selectedTopicQuestions: updatedSelectedQuestionList,
              totalQuestionSolved,
            },
          });
          dismiss(() => dispatch({ type: "RESET" }), 3);
        }
      }
    };
  }

  function getOnChangeSearch() {
    return (e: any) => setSearchText(e.target.value.toLowerCase());
  }

  function getFilteredQuestionList(): IQuestion[] | undefined {
    return selectedTopicQuestions?.filter((ques: IQuestion) =>
      ques.Problem.toLowerCase().includes(searchText)
    );
  }

  return {
    getFilteredQuestionList,
    getOnChangeSearch,
    whenPressedCheckBox,
    feedSelectQuestionData,
    searchText,
    setSearchText,
    allQuestions,
    totalSolvedQuestion,
    selectedTopic,
    selectedTopicQuestions,
    dispatch,
    dismiss,
    pathname,
  };
}
