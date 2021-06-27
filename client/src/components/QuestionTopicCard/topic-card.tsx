import React from "react";
import {IQuestionData} from "../../Backend/model/Question-model";

interface TopicCardProps {
    questionData: IQuestionData
}

const TopicCard: React.FC<TopicCardProps> = ({questionData}: TopicCardProps) => {
    return (
        <React.Fragment>
            <div
                className="flex mx-auto dark:bg-indigo-600 hover:bg-gray-100 dark:hover:bg-blue-700 dark:hover:border-white border shadow-lg border-indigo-600 m-3 flex-row bg-white shadow-sm rounded-lg p-4 transform hover:scale-110 ease-in-out delay-50 duration-300"
                style={{background: 1 === 0 ? "#e0ffe9" : ""}}
            >
                <div
                    className="flex items-center  justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-blue-100 text-blue-500">
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
                    <div className="text-xl dark:text-white  text-gray-800">
                        {'Arrays'}
                    </div>
                    <span>
              {" "}
                        <span className="dark:text-gray-100">Total Questions: </span>
              <div className="font-bold text-indigo-600 text-lg inline">
                {" "}
                  {34}{" "}
              </div>
                        {" "}
            </span>

                </div>
            </div>
        </React.Fragment>
    )
}

export default TopicCard