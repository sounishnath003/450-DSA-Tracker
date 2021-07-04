import React from "react";
import { Link } from "react-router-dom";
import { SearchIcon, UploadIcon } from "../../assets/icons";
import { IQuestion } from "../../Backend/model/Question-model";
import Breadcrumb from "../Breadcums";
import CategoryNavbar from "../Category/CategoryNavbar";
import useDragDropHook from "../Category/useDragDrop.hook";
import { DonePill, PendingPill } from "../Pill";
import Table from "../Table";
import { Tbody, Td } from "../Table/Tbody";
import Thead, { Th } from "../Table/Thead";
import { useHook } from "./hook";

function QuestionStatCard(): JSX.Element {
  const {
    getFilteredQuestionList,
    getOnChangeSearch,
    pathname,
    whenPressedCheckBox,
    searchText,
    selectedTopic,
  } = useHook();

  if (getFilteredQuestionList === undefined) return <> </>;

  const { onDragStart } = useDragDropHook();

  function SolveButton(): JSX.Element {
    return (
      <button
        type="button"
        className="rounded-md px-4 py-2 m-2 select-none text-white bg-indigo-600 hover:bg-indigo-800 focus:outline-none focus:shadow-outline"
      >
        Solve first
      </button>
    );
  }

  function UploadCodeButton({
    question,
    qindex,
  }: {
    question: IQuestion;
    qindex: number;
  }) {
    if (question.Done === true) {
      if (question.code === undefined) {
        return (
          <Link
            to={{
              key: question.Problem,
              pathname: `/${pathname}/uploadCode`,
              state: { question, qindex, topicName: selectedTopic },
            }}
          >
            <div className="flex cursor-pointer space-x-2 border border-green-500 text-green-500 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:text-white hover:bg-green-600 focus:outline-none focus:shadow-outline">
              <div>
                <UploadIcon size={18} color={"green"} />
              </div>
              <div>Code</div>
            </div>
          </Link>
        );
      } else
        return (
          <Link
            to={{
              key: question.Problem,
              pathname: `/${pathname}/uploadCode`,
              state: { question, qindex, topicName: selectedTopic },
            }}
          >
            <button
              type="button"
              className="rounded-md px-4 py-2 m-2 select-none text-white bg-indigo-600 hover:bg-indigo-800 focus:outline-none focus:shadow-outline"
            >
              View solution
            </button>
          </Link>
        );
    }
    return <> </>;
  }

  function GenerateTableContent() {
    return (
      <>
        {getFilteredQuestionList()?.map(
          (question: IQuestion, index: number) => (
            <tr
              className={` ${question.Done ? "bg-green-100" : ""} `}
              key={index}
              draggable={true}
              onDragStart={(event) => onDragStart(event, question)}
            >
              <Td>
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <div className="ml-2 mt-2 text-gray-800">{index}</div>
                  </div>
                </div>
              </Td>
              <Td>
                <div className={"cursor-pointer"}>
                  <div className="text-sm text-gray-900 break-all hover:text-indigo-700 max-w-md break-all">
                    <a href={question.URL} target={"_blank"} rel="noreferrer">
                      {question.Problem.substring(0, 70)}
                    </a>
                  </div>
                  <div className="text-sm text-gray-500">
                    {" "}
                    {question.Topic}{" "}
                  </div>
                </div>
              </Td>
              <Td>{question.Done ? <DonePill /> : <PendingPill />}</Td>
              <Td>
                <label className="inline-flex items-center">
                  <input
                    checked={question.Done}
                    onChange={whenPressedCheckBox(question, index)}
                    type="checkbox"
                    className="form-checkbox h-4 w-4 bg-green-500"
                  />
                </label>
              </Td>
              <Td>
                <div className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {question.Done ? (
                    <UploadCodeButton question={question} qindex={index} />
                  ) : (
                    <SolveButton />
                  )}
                </div>
              </Td>
            </tr>
          )
        )}
      </>
    );
  }

  return (
    <React.Fragment>
      <div className="text-4xl dark:text-white text-center text-gray-800 mb-6">
        {" "}
        🪝🪙 {selectedTopic} Problem
      </div>

      <Breadcrumb root1={`${selectedTopic}`} root2={null} link1={pathname} />
      <CategoryNavbar />

      <div className="mt-4">
        <div className="m-auto max-w-md h-10 flex rounded-md shadow-xl">
          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
            Search <SearchIcon size={20} color={"#333"} />
          </span>
          <input
            type="search"
            name="search"
            id="searchBox"
            onChange={getOnChangeSearch()}
            value={searchText}
            className="focus:ring-indigo-500 border outline-none flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
            placeholder=" I want to search for ..."
          />
        </div>
      </div>

      <Table>
        <Thead>
          <Th title={"Sl.No"} />
          <Th title={"Question(s)"} />
          <Th title={"Status"} />
          <Th title={"Done"} />
          <Th title={"Solution"} />
        </Thead>
        <Tbody>
          <GenerateTableContent />
        </Tbody>
      </Table>
    </React.Fragment>
  );
}

export default QuestionStatCard;
