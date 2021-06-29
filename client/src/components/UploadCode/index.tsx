import React from 'react';
import {useHistory} from "react-router-dom";
import {IQuestion, IQuestionData} from "../../Backend/model/Question-model";
import Breadcrumb from "../Breadcums";
import Editor from "@monaco-editor/react";
import {useQuestion} from "../../context/QuestionContext";
import env from "../../env";
import {EditIcon} from '../../assets/icons';

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
    "text"
];

interface UploadCodeProps {
}

const UploadCode = ({}: UploadCodeProps) => {
    const {location, goBack} = useHistory();
    const [question, setQuestion] = React.useState<IQuestion>((location as any).state.question);
    const questionIndex: number = (location as any).state.qindex;
    const topicName: string = (location as any).state.topicName;

    const initialCodeFragment = typeof question.haveSolution === "boolean" ? question.code as string : `// ${question.Problem} Solution`;

    const [visible, setvisible] = React.useState<boolean>(false);
    const [code, setCode] = React.useState<string>(initialCodeFragment);
    const [progLang, setProgLang] = React.useState<string>('java');

    function toggleClass() {
        const b = document.getElementById(`temp-0`);
        b?.classList.add("shown-hide");
        setvisible(true);
    }


    function getLink1() {
        return `/${topicName
            .replace(" & ", "-")
            .toLowerCase()}`
    }

    function handleEditorChange(value: string, event: any) {
        setCode(value);
    }

    function setLanguage(e: React.ChangeEvent<HTMLSelectElement>) {
        setProgLang(e.target.value);
    }

    const {allQuestions, selectedTopic, dispatch, dismiss, selectedTopicQuestions} = useQuestion();

    async function saveCode() {
        const updatedQuestion = {...question, code, haveSolution: true};
        setQuestion(updatedQuestion);

        const updatedQuestionList: IQuestion[] = selectedTopicQuestions?.map((questn: IQuestion, qid: number) => {
            if (questionIndex === qid) {
                return updatedQuestion;
            } else {
                return questn;
            }
        }) as unknown as IQuestion[];

        const finalPayload: IQuestionData[] = allQuestions.map((aquestion: IQuestionData, qiidx: number) => {
            if (selectedTopic === aquestion.topicName) {
                return {
                    ...aquestion,
                    questions: [...updatedQuestionList]
                }
            } else {
                return aquestion;
            }
        })

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
                    selectedTopicQuestions: updatedQuestionList
                }
            });
            dismiss(() => dispatch({type: "RESET"}), 3);
        }
    }

    const [requestForEdit, setRequestEdit] = React.useState<boolean>(false);

    function toggleRequestForEdit() {
        setRequestEdit(!requestForEdit);
        if (requestForEdit === true) saveCode();
    }

    // @ts-ignore
    return <React.Fragment>
        <div className="text-3xl dark:text-white text-center text-gray-800 mb-6"> 🪝🪙 {question.Problem} Problem
            Solution
        </div>
        <Breadcrumb root1={question.Topic} link1={getLink1()} root2={question.Problem}/>

        <div className={'my-16'}>
            {question.haveSolution ?
                <div className={'max-w-full'}>
                    <select value={progLang} id={'selectBox'} onChange={(e) => setLanguage(e)}
                            className={"border border-gray-800 text-gray-800 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none focus:outline-none focus:shadow-outline"}>
                        {languages.map((language: string, index: number) => <option key={language}
                                                                                    value={language}
                                                                                    className={'px-2 py-2 m-2'}> {language} </option>)}
                    </select>
                    <button
                        type="button"
                        onClick={toggleRequestForEdit}
                        className="border float-right mb-4 border-green-700 text-green-700 rounded-md px-4 py-2 m-2 transition duration-200 ease select-none hover:text-white hover:bg-green-500 focus:outline-none focus:shadow-outline"
                    >
                <span className="flex flex-wrap space-x-2">
                    <div> <EditIcon size={20} color={'green'}/> </div>
                    <div>{requestForEdit ? 'Save Changes' : 'Edit Code'}</div>
                </span>
                    </button>

                    <Editor defaultLanguage={progLang} height={'90vh'}
                            onChange={handleEditorChange}
                            options={{
                                fontFamily: "rec mono linear, Cascadia Code, Consolas, monospace",
                                readOnly: !requestForEdit
                            }} defaultValue={question.code as string}/>
                </div>
                : <>
                    <div id="temp-0" onClick={toggleClass}
                         className="p-12 shown rounded-lg border text-center bg-gray-50 ">
                        <div>
                            <div className="text-xl text-indigo-600">
                                No Solution Uploaded
                            </div>
                            <div className=""></div>
                            <p className="block text-base">
                                {" "}
                                click here to paste and upload solution{" "}
                            </p>
                        </div>
                    </div>
                    {visible && <>
                        <div className="my-3">

                            <select value={progLang} id={'selectBox'} onChange={(e) => setLanguage(e)}
                                    className={"border border-gray-800 text-gray-800 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none focus:outline-none focus:shadow-outline"}>
                                {languages.map((language: string, index: number) => <option key={language}
                                                                                            value={language}
                                                                                            className={'px-2 py-2 m-2'}> {language} </option>)}
                            </select>


                            <button
                                type="button"
                                onClick={saveCode}
                                className="border border-gray-700 text-gray-700 rounded-md px-4 py-2 m-2 transition duration-200 ease select-none hover:text-white hover:bg-gray-800 focus:outline-none focus:shadow-outline"
                            >
                                Save Code
                            </button>
                        </div>
                        <Editor options={{fontFamily: "rec mono linear, Cascadia Code, Consolas, monospace"}}
                                language={progLang} defaultLanguage={'java'} height={'90vh'} defaultValue={code}
                                onChange={handleEditorChange}/>
                    </>}
                </>
            }
        </div>
    </React.Fragment>
}

export default UploadCode;