import React from "react";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  IQuestion,
  IQuestionData,
} from "../../../Backend/model/Question-model";
import { QuestionDataContext } from "../../../context/QuestionDataContext";

type IData = {
  index: number;
  question: IQuestion;
  questionData: IQuestionData;
};

const UploadCode: React.FC = (Props: any) => {
  const { question, questionData, index } = Props.location.state as IData;

  const [visible, setvisible] = React.useState<boolean>(false);
  const [visible2, setvisible2] = React.useState<boolean>(true);
  const [solutionCode, setSolutionCode] = React.useState<string>();
  const router = useHistory();

  const { updateData } = React.useContext(QuestionDataContext);

  React.useEffect(() => {
    // toast.warn("solution has been updated");
  }, [visible, visible2]);

  function BreadCrums() {
    return (
      <>
        <div className=" text-sm text-center mt-3">
          <span>
            <Link className="text-blue-600" to="/">
              Topics
            </Link>{" "}
            /{" "}
            <Link
              className="text-blue-600"
              to={`/${questionData.topicName
                .replace(" & ", "-")
                .toLowerCase()}`}
            >
              {question.Topic}
            </Link>{" "}
            /{" "}
            <span className="bg-black tracking-wide text-white px-2 mx-3 rounded-lg py-1">
              {question.Problem}
            </span>
          </span>
        </div>
      </>
    );
  }

  function SubmitSolutionTextBox({ fromEditCode: boolean = false }) {
    return (
      <>
        <div id="textarea" className="bg-gray-50">
          <textarea
            value={solutionCode || (question.code as string)}
            onChange={(e: any) => setSolutionCode(e.target.value)}
            className="w-full h-64 bg-transparent"
            autoFocus
          ></textarea>
        </div>
        <div className="my-4">
          <button
            onClick={submitCode}
            className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 border-b-4 border-red-700 hover:border-blue-500 rounded"
          >
            Upload Code
          </button>
        </div>
      </>
    );
  }

  function toggleClass() {
    let b = document.getElementById(`temp-0`);
    b?.classList.add("shown-hide");
    setvisible(true);
  }

  function submitCode() {
    const updatedQuestionState = questionData.questions.map((ques, idx) => {
      if (index === idx) {
        return { ...ques, haveSolution: true, code: solutionCode };
      }
      return ques;
    });

    updateData(
      questionData.topicName,
      {
        ...questionData,
        questions: updatedQuestionState,
      },
      questionData.position
    );

    setvisible(false);
    setvisible2(true);
    router.goBack();
  }

  function editCode() {
    setvisible2(false);
  }

  function copyCode() {}

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="m-auto h-auto rounded-lg mt-6">
        <div className="text-4xl dark:text-white text-center text-gray-800">
          {" "}
          🐱‍{question.Problem} Solution
        </div>

        <BreadCrums />

        <div className="my-8">
          {question.haveSolution ? (
            <>
              {" "}
              <div className="max-w-7xl">
                <div className="parent">
                  <div id="store-code-1Rx" className="div">
                    {visible2 ? (
                      <>
                        <button
                          className="text-sm outline-none border-none mr-3 px-2 py-1 text-white bg-red-500 m-2 float-right font-mono rounded-lg"
                          onClick={copyCode}
                        >
                          COPY
                        </button>
                        <textarea
                          id="codecopy"
                          style={{ display: "none" }}
                          value={question.code as string}
                        ></textarea>
                        <pre className="font-mono font-bold bg-gray-50 p-3 rounded-lg text-sm whitespace-pre-wrap">
                          {question.code}
                        </pre>
                      </>
                    ) : (
                      <SubmitSolutionTextBox fromEditCode={true} />
                    )}
                  </div>
                  <div className="div">
                    {" "}
                    <button
                      onClick={editCode}
                      className="bg-gray-800 float-right hover:bg-gray-700 text-white py-2 px-4 border-b-4 border-red-700 hover:border-blue-500 rounded"
                    >
                      Edit Code
                    </button>
                  </div>
                </div>
              </div>{" "}
            </>
          ) : (
            <>
              {" "}
              <div className="p-8 shown rounded-lg border text-center bg-gray-50 ">
                <div id="temp-0" onClick={toggleClass}>
                  <div className="text-xl text-indigo-600">
                    No Solution Uploaded
                  </div>
                  <div className=""></div>
                  <p className="block text-base">
                    {" "}
                    click here to paste and upload solution{" "}
                  </p>
                </div>
                {visible && <SubmitSolutionTextBox />}
              </div>
            </>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default UploadCode;
