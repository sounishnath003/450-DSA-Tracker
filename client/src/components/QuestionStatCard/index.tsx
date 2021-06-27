import React from "react";
import {useQuestion} from "../../context/QuestionContext";
import Table from "../Table";
import Thead, {Th} from "../Table/Thead";
import {Tbody, Td} from "../Table/Tbody";
import {PendingPill} from "../Pill";
import {IQuestion} from "../../Backend/model/Question-model";

interface QuestionStatCardProps {

}

const QuestionStatCard: React.FC<QuestionStatCardProps> = ({}: QuestionStatCardProps) => {
    const {selectedTopic, selectedTopicQuestions} = useQuestion();
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
                    {selectedTopicQuestions?.map((question: IQuestion, index: number) => <tr>
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
                                    className="text-sm text-gray-900 break-all hover:text-indigo-700 max-w-md break-all"> {question.Problem} </div>
                                <div className="text-sm text-gray-500"> {question.Topic} </div>
                            </div>
                        </Td>
                        <Td>
                            <PendingPill/>
                        </Td>
                        <Td>
                            <label className="inline-flex items-center">
                                <input type="checkbox" className="form-checkbox h-4 w-4 text-green-500"/>
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
