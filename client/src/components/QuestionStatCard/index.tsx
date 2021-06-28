import React from "react";
import {useQuestion} from "../../context/QuestionContext";
import Table from "../Table";
import Thead, {Th} from "../Table/Thead";
import {Tbody, Td} from "../Table/Tbody";
import {DonePill, PendingPill} from "../Pill";
import {IQuestion, IQuestionData} from "../../Backend/model/Question-model";
import Breadcrumb from "../Breadcums";
import env from "../../env";
import {RouterMapTopicName} from "../../routes";
import {SearchIcon, UploadIcon} from "../../assets/icons";
import {Link} from "react-router-dom";
import CategoryNavbar from "../Category/CategoryNavbar";

interface QuestionStatCardProps {

}

function QuestionStatCard({}: QuestionStatCardProps): JSX.Element {
    const {allQuestions, selectedTopic, selectedTopicQuestions, dispatch, dismiss} = useQuestion();
    const pathname: string = decodeURI(window.location.pathname).split("/")[1];

    const [searchText, setSearchText] = React.useState<string>("");

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
                let doneCount = question.Done ? -1 : 1;
                const updatedQuestion: IQuestion = {
                    ...question,
                    Done: !question.Done,
                }


                const updatedSelectedQuestionList: IQuestion[] = selectedTopicQuestions?.map((selectedQuestion: IQuestion, sIdx: number) => {
                    if (selectedQuestion.Done) doneCount++;
                    if (sIdx === quesIndex) {
                        return updatedQuestion;
                    } else {
                        return selectedQuestion;
                    }
                });

                const finalPayload: IQuestionData[] = allQuestions.map((questionTopic: IQuestionData, qindex: number) => {
                    if (selectedTopic === questionTopic.topicName) {
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
                    if (resp.error.status === 401) window.location.reload();
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

    function getOnChangeSearch() {
        return (e: any) => setSearchText(e.target.value.toLowerCase());
    }

    function getFilteredQuestionList(): IQuestion[] | undefined {
        return selectedTopicQuestions?.filter((ques: IQuestion, index: number) => ques.Problem.toLowerCase().includes(searchText));
    }

    function SolveButton(): JSX.Element {
        return <button
            type="button"
            className="rounded-md px-4 py-2 m-2 select-none text-white bg-indigo-600 hover:bg-indigo-800 focus:outline-none focus:shadow-outline"
        >
            Solve first
        </button>
    }

    function UploadCodeButton({question, qindex}: { question: IQuestion, qindex: number }): JSX.Element {
        if (question.Done === true) {
            if (question.code === undefined) {
                return <Link to={{
                    key: question.Problem,
                    pathname: `/${pathname}/uploadCode`,
                    state: {question, qindex, topicName: selectedTopic}
                }}>
                    <div
                        className="flex cursor-pointer space-x-2 border border-green-500 text-green-500 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:text-white hover:bg-green-600 focus:outline-none focus:shadow-outline"
                    >
                        <div><UploadIcon size={18} color={"green"}/></div>
                        <div>Code</div>
                    </div>
                </Link>
            } else return <Link to={{
                key: question.Problem, pathname: `/${pathname}/uploadCode`,
                state: {question, qindex, topicName: selectedTopic}
            }}>
                <button
                    type="button"
                    className="rounded-md px-4 py-2 m-2 select-none text-white bg-indigo-600 hover:bg-indigo-800 focus:outline-none focus:shadow-outline"
                >
                    View solution
                </button>
            </Link>
        }
    }

    function GenerateTableContent(): JSX.Element[] | undefined {
        return getFilteredQuestionList()?.map((question: IQuestion, index: number) =>
            <tr
                className={` ${question.Done ? "bg-green-100" : ""} `} key={index}>
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
                            <a href={question.URL} target={"_blank"}
                               rel="noreferrer">{question.Problem.substring(0, 70)}</a>
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
                               type="checkbox" className="form-checkbox h-4 w-4 bg-green-500"/>
                    </label>
                </Td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {question.Done ? <UploadCodeButton question={question} qindex={index}/> :
                        <SolveButton/>}
                </td>
            </tr>);

    }

    // @ts-ignore
    return (
        <React.Fragment>
            <div className="text-4xl dark:text-white text-center text-gray-800 mb-6"> 🪝🪙 {selectedTopic} Problems
            </div>

            <Breadcrumb root1={`${selectedTopic}`} root2={null} link1={pathname}/>
            <CategoryNavbar/>

            <div className="mt-4">
                <div className="m-auto max-w-md h-10 flex rounded-md shadow-xl">
                  <span
                      className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    Search  <SearchIcon size={20} color={'#333'}/>
                  </span>
                    <input type="search" name="search" id="searchBox"
                           onChange={getOnChangeSearch()}
                           value={searchText}
                           className="focus:ring-indigo-500 border outline-none flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                           placeholder=" I want to search for ..."/>
                </div>
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
                    {GenerateTableContent() !== undefined ? <GenerateTableContent/> :
                        <tr className={'text-red-600'}><Td>😵‍💫 No search results found! </Td></tr>}
                </Tbody>
            </Table>
        </React.Fragment>
    )

}

export default QuestionStatCard;
