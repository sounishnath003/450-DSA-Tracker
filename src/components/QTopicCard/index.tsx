import React from "react";
import { Link } from "react-router-dom";
import { IQuestionData } from "../../Backend/model/Question-model";

interface Props {
  questionData: IQuestionData;
  updateData: Function;
}

const QTopicCard: React.FC<Props> = ({ questionData, updateData }) => {
  const {
    topicName,
    started,
    questions,
  } = questionData;

  return (
    <>
      <Link to={`/${topicName.replace(" & ", "-").toLowerCase()}`}>
        <div className="flex hover:bg-gray-100 border shadow-lg border-indigo-600 m-3 flex-row bg-white shadow-sm rounded-lg p-4 transform hover:scale-110 ease-in-out delay-50 duration-300">
          <div className="flex items-center  justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-blue-100 text-blue-500">
            <svg
              className="w-6 h-6 "
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
          </div>
          <div className="flex  flex-col  flex-grow ml-4">
            <div className="text-xl text-gray-800">{topicName}</div>
            <span>
              {" "}
              Total Questions:{" "}
              <div className="font-bold text-indigo-600 text-lg inline">
                {" "}
                {questions.length}{" "}
              </div>{" "}
            </span>
            <div className="text-sm">
              {" "}
              {started && (
                <div className="text-green-600 px-3 py-1 inline rounded-lg bg-gray-100">
                  14 more to go
                </div>
              )}
              {started ? (
                <div className="text-green-400">Started Solving</div>
              ) : (
                <div className="text-red-700">Not yet started</div>
              )}{" "}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default QTopicCard;
