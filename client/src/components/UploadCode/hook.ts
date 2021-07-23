import React from "react";
import { useHistory } from "react-router-dom";
import { IQuestion, IQuestionData } from "../../Backend/model/Question-model";
import { useQuestion } from "../../context/QuestionContext";

export function useHook() {
  const languages = [
    "Select Language",
    "coffeescript",
    "objective-c",
    "bat",
    "clojure",
    "cpp",
    "c",
    "csharp",
    "csp",
    "dockerfile",
    "fsharp",
    "go",
    "graphql",
    "handlebars",
    "html",
    "java",
    "javascript",
    "javascript-react",
    "json",
    "lua",
    "markdown",
    "php",
    "powershell",
    "pug",
    "python",
    "r",
    "ruby",
    "rust",
    "swift",
    "typescript",
    "typescript-react",
    "xml",
    "yaml",
    "css",
    "less",
    "scss",
    "text",
  ];

  const { location, goBack } = useHistory();
  const [question, setQuestion] = React.useState<IQuestion>(
    (location as any).state.question
  );
  const questionIndex: number = (location as any).state.qindex;
  const topicName: string = (location as any).state.topicName;

  const initialCodeFragment =
    typeof question.haveSolution === "boolean"
      ? (question.code as string)
      : `// ${question.Problem} Solution`;

  const [visible, setvisible] = React.useState<boolean>(false);
  const [code, setCode] = React.useState<string>(initialCodeFragment);
  const [progLang, setProgLang] = React.useState<string>("java");

  function toggleClass() {
    const b = document.getElementById(`temp-0`);
    b?.classList.add("shown-hide");
    setvisible(true);
  }

  function getLink1() {
    return `/${topicName.replace(" & ", "-").toLowerCase()}`;
  }

  function handleEditorChange(value: string) {
    setCode(value);
  }

  function setLanguage(e: React.ChangeEvent<HTMLSelectElement>) {
    setProgLang(e.target.value);
  }

  const {
    allQuestions,
    selectedTopic,
    dispatch,
    dismiss,
    selectedTopicQuestions,
  } = useQuestion();

  async function saveCode() {
    const updatedQuestion = { ...question, code, haveSolution: true };
    setQuestion(updatedQuestion);

    const updatedQuestionList: IQuestion[] = selectedTopicQuestions?.map(
      (questn: IQuestion, qid: number) => {
        if (questionIndex === qid) {
          return updatedQuestion;
        } else {
          return questn;
        }
      }
    ) as unknown as IQuestion[];

    const finalPayload: IQuestionData[] = allQuestions.map(
      (aquestion: IQuestionData) => {
        if (selectedTopic === aquestion.topicName) {
          return {
            ...aquestion,
            questions: [...updatedQuestionList],
          };
        } else {
          return aquestion;
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
          selectedTopicQuestions: updatedQuestionList,
        },
      });
      dismiss(() => dispatch({ type: "RESET" }), 3);
    }
  }

  const [requestForEdit, setRequestEdit] = React.useState<boolean>(false);

  function toggleRequestForEdit() {
    if (requestForEdit === true) {
      saveCode();
    }
    setRequestEdit(!requestForEdit);
  }

  return {
    allQuestions,
    languages,
    visible,
    question,
    setQuestion,
    code,
    dismiss,
    dispatch,
    getLink1,
    handleEditorChange,
    progLang,
    requestForEdit,
    saveCode,
    selectedTopic,
    selectedTopicQuestions,
    setCode,
    setLanguage,
    setProgLang,
    setRequestEdit,
    setvisible,
    toggleClass,
    toggleRequestForEdit,
  };
}
