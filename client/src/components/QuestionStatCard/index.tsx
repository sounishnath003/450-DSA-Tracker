import React from "react";
import {useQuestion} from "../../context/QuestionContext";
import Table from "../Table";
import Thead, {Th} from "../Table/Thead";
import {Tbody, Td} from "../Table/Tbody";
import {DonePill, PendingPill} from "../Pill";
import {IQuestion, IQuestionData} from "../../Backend/model/Question-model";
import env from '../../env';
import {RouterMapTopicName} from "../../routes";

interface QuestionStatCardProps {

}

function QuestionStatCard({}: QuestionStatCardProps): JSX.Element {
    const {allQuestions, selectedTopic, selectedTopicQuestions, dispatch, dismiss} = useQuestion();
    const pathname: string = decodeURI(window.location.pathname).split("/")[1];

    async function feedSelectQuestionData(abortController: AbortController) {
        // @ts-ignore
        const resp = await (await fetch(`${env.API_URL}/api/questions/topic/${RouterMapTopicName[pathname]}`, {
            credentials: "include",
            signal: abortController.signal
        })).json();
        if (resp.error) {
            dispatch({type: "ERROR", payload: resp.error.message});
        } else {
            dispatch({
                type: "SELECT_QUESTION_TOPIC", payload: {
                    index: resp.questions[0].position,
                    questionTopic: {...resp.questions[0]}
                }
            })
        }
    }

    React.useEffect(() => {
        const abortController: AbortController = new AbortController();
        if (selectedTopic === null)
            feedSelectQuestionData(abortController);
        return () => abortController.abort();
    }, [])

    function whenPressedCheckBox(question: IQuestion, quesIndex: number) {
        return async function (p1: React.ChangeEvent<HTMLInputElement>) {
            if (selectedTopicQuestions !== null && selectedTopic !== null) {
                const updatedQuestion: IQuestion = {
                    ...question,
                    Done: !question.Done,
                }
                let doneCount = updatedQuestion.Done ? 1 : 0;
                const updatedSelectedQuestionList: IQuestion[] = selectedTopicQuestions?.map((selectedQuestion: IQuestion, sIdx: number) => {
                    if (selectedQuestion.Done) doneCount++;
                    if (sIdx === quesIndex) {
                        return updatedQuestion;
                    } else {
                        return selectedQuestion;
                    }
                });

                const finalPayload: IQuestionData[] = allQuestions.map((questionTopic: IQuestionData, qindex: number) => {
                    if (questionTopic.topicName === updatedQuestion.Topic) {
                        return {
                            ...questionTopic,
                            questions: [...updatedSelectedQuestionList],
                            doneQuestions: doneCount,
                            started: doneCount > 0 ? true : false
                        }
                    } else {
                        return questionTopic;
                    }
                });

                const resp = await (await fetch(`${env.API_URL}/api/questions/update-progress`, {
                    method: "PATCH",
                    headers: {
                        'Content-Type': "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify(finalPayload)
                })).json();

                if (resp.error) {
                    dispatch({type: "ERROR", payload: resp.error.message});
                    dismiss(() => dispatch({type: "RESET"}), 3);
                } else {
                    dispatch({
                        type: "UPDATE_PROGRESS",
                        payload: {
                            message: resp.message,
                            allQuestions: finalPayload,
                            selectedTopicQuestions: updatedSelectedQuestionList
                        }
                    });
                    dismiss(() => dispatch({type: "RESET"}), 3);
                }
            }
        };
    }

    return (
        <React.Fragment>
            <div className="text-4xl dark:text-white text-center text-gray-800 mb-6"> 🪝🪙 {selectedTopic} Problems
            </div>
            <Table>
                <Thead>
                    <Th title={"Sl.No"}/>
                    <Th title={"Question(s)"}/>
                    <Th title={"Status"}/>
                    <Th title={"Done"}/>
                    <Th title={"Solution"}/>
                </Thead>
                <Tbody>
                    {selectedTopicQuestions?.map((question: IQuestion, index: number) => <tr key={index}>
                        <Td>
                            <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                    <div className="ml-2 mt-2 text-gray-800">{index}</div>
                                </div>
                            </div>
                        </Td>
                        <Td>
                            <div className={"cursor-pointer"}>
                                <div
                                    className="text-sm text-gray-900 break-all hover:text-indigo-700 max-w-md break-all">
                                    <a href={question.URL} target={"_blank"}>{question.Problem.substring(0, 70)}</a>
                                </div>
                                <div className="text-sm text-gray-500"> {question.Topic} </div>
                            </div>
                        </Td>
                        <Td>
                            {question.Done ? <DonePill/> : <PendingPill/>}
                        </Td>
                        <Td>
                            <label className="inline-flex items-center">
                                <input checked={question.Done} onChange={whenPressedCheckBox(question, index)}
                                       type="checkbox" className="form-checkbox h-4 w-4 text-green-500"/>
                            </label>
                        </Td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                        </td>
                    </tr>)}
                </Tbody>
            </Table>
        </React.Fragment>
    );
}

export default QuestionStatCard;
