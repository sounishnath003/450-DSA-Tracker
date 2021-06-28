import React from "react";
import {IQuestionData} from "../../Backend/model/Question-model";
import {Link} from 'react-router-dom';
import {QuesIcon} from "../../assets/icons";

interface TopicCardProps {
    questionData: IQuestionData
}

function findPercentageCompleted(
    totalQuestions: number,
    doneQuestions: number
) {
    return Math.round((doneQuestions / totalQuestions) * 100);
}

const TopicCard: React.FC<TopicCardProps> = ({questionData}: TopicCardProps) => {

    const remainingQuestions: number = questionData.questions.length - questionData.doneQuestions;
    const percentageDone = findPercentageCompleted(questionData.questions.length, questionData.doneQuestions);

    return (
        <React.Fragment>
            <Link to={`${questionData.topicName.replace(" & ", "-").toLowerCase()}`}>
                <div
                    className="flex mx-auto dark:bg-indigo-600 hover:bg-gray-100 dark:hover:bg-blue-700 dark:hover:border-white border shadow-lg border-indigo-600 m-3 flex-row bg-white shadow-sm rounded-lg p-4 transform hover:scale-110 ease-in-out delay-50 duration-300"
                    style={{background: remainingQuestions === 0 ? "#e0ffe9" : ""}}
                >
                    <div
                        className="flex items-center  justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-blue-100 text-blue-500">
                        <QuesIcon/>
                    </div>
                    <div className="flex  flex-col  flex-grow ml-4">
                        <div className="text-xl dark:text-white  text-gray-800">
                            {questionData.topicName}
                        </div>
                        <span>
              {" "}
                            <span className="dark:text-gray-100">Total Questions: </span>
              <div className="font-bold text-indigo-600 text-lg inline">
                {" "}
                  {questionData.questions.length}{" "}
              </div>
                            {" "}
            </span>
                        <div className="text-sm">
                            {" "}
                            {questionData.started && (
                                <div className="text-green-600 px-3 py-1 inline rounded-lg bg-gray-100">
                                    {remainingQuestions} more to go
                                </div>
                            )}
                            {questionData.started && (
                                <div className="relative pt-1 my-2">
                                    <div className="flex mb-2 items-center justify-between">
                                        <div>
                      <span
                          className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                        {remainingQuestions === 0
                            ? "Finished 👏🏻"
                            : `Started 🙇🏻‍♂️`}
                      </span>
                                        </div>
                                        <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-green-600">
                        {percentageDone}%
                      </span>
                                        </div>
                                    </div>
                                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                                        <div
                                            style={{width: `${percentageDone}%`}}
                                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                                        ></div>
                                    </div>
                                </div>
                            )}
                            {questionData.started ? (
                                <div className="text-green-400">
                                    {remainingQuestions === 0
                                        ? "Finished Practice 👏🏻"
                                        : `Started Solving 🙇🏻‍♂️`}
                                </div>
                            ) : (
                                <div className="text-red-700">Not yet started</div>
                            )}{" "}
                        </div>
                    </div>
                </div>
            </Link>

        </React.Fragment>
    )
}

export default TopicCard