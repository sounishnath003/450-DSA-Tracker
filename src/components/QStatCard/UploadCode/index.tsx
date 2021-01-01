import React, { useState } from "react";
import {
  IQuestion,
  IQuestionData,
} from "../../../Backend/model/Question-model";
const Modal = require("react-modal");

Modal.setAppElement("#root");

interface Props {
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  haveSolution: boolean | undefined;
  solutionCode: string | undefined;
  questionData: IQuestionData;
  updateData: Function;
  index: number;
}

const UploadCode: React.FC<Props> = ({
  index,
  updateData,
  haveSolution,
  solutionCode,
  modalIsOpen,
  setModalIsOpen,
  questionData,
}) => {
  const [updateCode, setUpdateCode] = useState<string | undefined>(
    solutionCode
  );

  console.log({ solutionCode });

  function saveCodeTrigger(e: any) {
    e.preventDefault();

    let qs: IQuestion = {
      solutionCode: updateCode,
      haveSolution: true,
      ...questionData.questions[index],
    };

    updateData(
      questionData.topicName,
      {
        topicName: questionData.topicName,
        started: questionData.started,
        doneQuestions: questionData.doneQuestions,
        questions: [qs, ...questionData.questions],
        position: questionData.position,
      },
      questionData.position
    );
    setModalIsOpen(true);
  }

  return (
    <>
      <Modal onRequestClose={() => setModalIsOpen(false)} isOpen={modalIsOpen}>
        <h2 className="m-3 text-indigo-700 leadning-none">
          Upload Solution Code
        </h2>
        {haveSolution ? (
          <code>
            <pre dangerouslySetInnerHTML={{ __html: `${solutionCode}` }}></pre>
          </code>
        ) : (
          <>
            <textarea
              onChange={(e) => setUpdateCode(e.target.value)}
              value={updateCode}
              name="uploadCode"
              className="resize bg-gray-100 w-3/5 p-2 border rounded-md"
              style={{ height: "80%" }}
              id="uploadCode"
              placeholder="Copy and Paste your code"
            ></textarea>
            <div className="m-0">
              <button
                className=" resize outline-none border-none px-4 py-2 rounded-lg bg-indigo-600"
                onClick={(e) => saveCodeTrigger(e)}
              >
                Save
              </button>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default UploadCode;
