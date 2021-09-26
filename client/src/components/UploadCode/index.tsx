/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Editor from "@monaco-editor/react";
import React from "react";
import { EditIcon } from "../../assets/icons";
import Breadcrumb from "../Breadcums";
import CategoryNavbar from "../Category/CategoryNavbar";
import { useHook } from "./hook";

const UploadCode = () => {
  const {
    code,
    getLink1,
    handleEditorChange,
    progLang,
    requestForEdit,
    languages,
    saveCode,
    setLanguage,
    question,
    visible,
    toggleClass,
    toggleRequestForEdit,
  } = useHook();

  return (
    <React.Fragment>
      <div className="text-3xl dark:text-white text-center text-gray-800 mb-6">
        {" "}
        🪝🪙 {question.Problem} Problem Solution
      </div>
      <Breadcrumb
        root1={question.Topic}
        link1={getLink1()}
        root2={question.Problem}
      />
      <CategoryNavbar />

      <div className={"my-16"}>
        {question.haveSolution ? (
          <div className={"max-w-full"}>
            <select
              value={progLang}
              id={"selectBox"}
              onChange={(e) => setLanguage(e)}
              className={
                "border border-gray-800 text-gray-800 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none focus:outline-none focus:shadow-outline"
              }
            >
              {languages.map((language: string, index: number) => (
                <option
                  key={language + index}
                  value={language}
                  className={"px-2 py-2 m-2"}
                >
                  {" "}
                  {language}{" "}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => toggleRequestForEdit()}
              className="border float-right mb-4 border-green-700 text-green-700 rounded-md px-4 py-2 m-2 transition duration-200 ease select-none hover:text-white hover:bg-green-500 focus:outline-none focus:shadow-outline"
            >
              <span className="flex flex-wrap space-x-2">
                <div>
                  {" "}
                  <EditIcon size={20} color={"green"} />{" "}
                </div>
                <div>{requestForEdit ? "Save Changes" : "Edit Code"}</div>
              </span>
            </button>

            <Editor
              defaultLanguage={progLang}
              height={"90vh"}
              onChange={(e) => handleEditorChange("" + e)}
              options={{
                readOnly: !requestForEdit,
              }}
              defaultValue={question.code as string}
            />
          </div>
        ) : (
          <>
            <div
              id="temp-0"
              onClick={toggleClass}
              className="p-12 shown rounded-lg border text-center bg-gray-50 "
            >
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
            {visible && (
              <>
                <div className="my-3">
                  <select
                    value={progLang}
                    id={"selectBox"}
                    onChange={(e) => setLanguage(e)}
                    className={
                      "border border-gray-800 text-gray-800 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none focus:outline-none focus:shadow-outline"
                    }
                  >
                    {languages.map((language: string, index: number) => (
                      <option
                        key={language + index}
                        value={language}
                        className={"px-2 py-2 m-2"}
                      >
                        {" "}
                        {language}{" "}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={() => saveCode()}
                    className="border border-gray-700 text-gray-700 rounded-md px-4 py-2 m-2 transition duration-200 ease select-none hover:text-white hover:bg-gray-800 focus:outline-none focus:shadow-outline"
                  >
                    Save Code
                  </button>
                </div>
                <Editor
                  language={progLang}
                  defaultLanguage={"java"}
                  height={"90vh"}
                  defaultValue={code}
                  onChange={(e) => handleEditorChange("" + e)}
                />
              </>
            )}
          </>
        )}
      </div>
    </React.Fragment>
  );
};

export default UploadCode;
