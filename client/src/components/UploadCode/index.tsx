import React from 'react';
import {useHistory} from "react-router-dom";
import {IQuestion} from "../../Backend/model/Question-model";
import Breadcrumb from "../Breadcums";
import Editor from "@monaco-editor/react";

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

    const [visible, setvisible] = React.useState<boolean>(false);
    const [visible2, setvisible2] = React.useState<boolean>(true);
    const [code, setCode] = React.useState<string>(`// ${question.Problem} Solution`);
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
        console.log(code)
    }

    function setLanguage(e: React.ChangeEvent<HTMLSelectElement>) {
        setProgLang(e.target.value);
    }

    // @ts-ignore
    return <React.Fragment>
        <div className="text-3xl dark:text-white text-center text-gray-800 mb-6"> 🪝🪙 {question.Problem} Problems</div>
        <Breadcrumb root1={question.Topic} link1={getLink1()} root2={question.Problem}/>

        <div className={'my-16'}>
            {question.haveSolution ?
                <div className={'max-w-full'}>
                    <Editor height={'90vh'} className={'font-sans'} defaultValue={question.code as string}/>
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