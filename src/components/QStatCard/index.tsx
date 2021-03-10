import React, { useEffect, useReducer, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IQuestion, IQuestionData } from "../../Backend/model/Question-model";
import { CustomCategoryFilterContext } from "../../context/CustomCategoryFilterContext";
import {
  SET_AS_EASY_QUESTION,
  SET_AS_HARD_QUESTION,
  SET_AS_MEDIUM_QUESTION,
} from "../../Reducer/customCategoryFilterReducer";
import { defaultQuesStat, reducer } from "../../Reducer/reducer";
import { tableRowLogic } from "./utils/utility";

/*
  questionData: IQuestionData; // data: IQuestion
  updateData: Function; // updatedData()
 */

type ICategoryRoute = { path: string; categoryType: string };

interface Props {
  questionData: IQuestionData; // data: IQuestion
  updateData: Function; // updatedData()
}

const QStatCard: React.FC<Props> = ({ questionData, updateData }) => {
  const { topicName, questions, started } = questionData;
  const [state, dispatch] = useReducer(reducer, defaultQuesStat);
  const [questionsState, setQuestionsState] = useState<IQuestion[]>(questions);
  const searchTxtRef = useRef<any>();
  // no of question ~ selected realtime
  const [selected, setSelected] = useState<number[]>([]);

  // @COMPLETED_ACTION - useEffect questionCompleted Update

  // *** Dragable questionState ***
  const [draggedQuestion, setDraggedQuestion] = React.useState<IQuestion>();

  useEffect(() => {
    if (questionData !== undefined) {
      let doneQuestions: number[] = [];
      questionData.questions.map((question: IQuestion, index: number) => {
        if (question.Done === true) {
          doneQuestions.push(index);
        }
      });
      setSelected(doneQuestions);
      if (doneQuestions.length > 0) {
        toast.success(
          `🎉 Hurray!! You've completed ${doneQuestions.length}/${questions.length}.`
        );
      }
    }
  }, [questionData, questions.length]);

  // searchBar component()
  function SearchBar(this: undefined) {
    function handleSearch() {
      const searchTxt: string = searchTxtRef.current.value;
      if (searchTxt !== "") {
        const nques: IQuestion[] = questions.filter(
          (ques: IQuestion, index: number) =>
            ques.Problem.toLowerCase().includes(searchTxt)
        );
        if (nques.length === 0) {
          // setNoData(true);
        }
        setTimeout(() => setQuestionsState(nques), 1505);
      } else {
        setQuestionsState(questions);
      }
    }
    return (
      <form>
        <div className="text-center">
          <div className="inline-flex">
            <div className="m-auto">
              <input
                ref={searchTxtRef}
                onChange={handleSearch}
                type="text"
                placeholder="search questions accordingly"
                className="px-3 py-2 w-64 border font-mono font-bold border-black bg-blue-100"
              />
            </div>
            <div className="m-auto border border-black rounded-tr rounded-br text-white px-3 bg-black py-2">
              <button
                className="uppercase tracking-wide"
                type="reset"
                onClick={() => {
                  setQuestionsState(questions);
                }}
              >
                Reset🤷‍♂️
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }

  function whenQuestionCompleted(key: string, index: number) {
    dispatch({
      type: "COMPLETED",
      payload: {
        index,
        selected,
        questionData,
        updateData,
      },
    });
  }

  const CategoryList = () => {
    const { dispatch } = React.useContext(CustomCategoryFilterContext);

    const routes: ICategoryRoute[] = [
      { path: "category-lists/easy", categoryType: "Easy" },
      { path: "category-lists/medium", categoryType: "Medium" },
      { path: "category-lists/hard", categoryType: "Hard" },
    ];

    // draggable events start
    function onDragOver(e: React.DragEvent<HTMLDivElement>) {
      e.stopPropagation();
      e.preventDefault();
    }

    function onDrop(e: React.DragEvent<HTMLDivElement>) {
      e.stopPropagation();
      const dropZone = e.currentTarget.id;
      console.log({ dropZone });
      if (dropZone === "easy") {
        dispatch({
          type: SET_AS_EASY_QUESTION,
          payload: { data: draggedQuestion },
        });
      } else if (dropZone === "medium") {
        dispatch({
          type: SET_AS_MEDIUM_QUESTION,
          payload: { data: draggedQuestion },
        });
      } else if (dropZone === "hard") {
        dispatch({
          type: SET_AS_HARD_QUESTION,
          payload: { data: draggedQuestion },
        });
      }
    }

    // draggable events end

    return (
      <div className="my-3">
        <div className="flex justify-evenly space-x-4">
          {routes.map((route: ICategoryRoute, index) => (
            <>
              <Link to={route.path}>
                <div
                  className={`items-center px-6 py-2 border-2 ${
                    index === 0
                      ? `border-green-400 hover:bg-green-200`
                      : index === 1
                      ? "border-blue-400 hover:bg-blue-200"
                      : `border-red-400 hover:bg-red-200`
                  } cursor-pointer rounded-lg shadow-lg`}
                  id={index === 0 ? `easy` : index === 1 ? `medium` : `hard`}
                  onDragOver={(event) => onDragOver(event)}
                  onDrop={(event) => onDrop(event)}
                >
                  <div className="flex space-x-1">
                    <div>
                      {" "}
                      {index === 0 ? (
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                          ></path>
                        </svg>
                      ) : index === 1 ? (
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                          ></path>
                        </svg>
                      ) : (
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                          ></path>
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                          ></path>
                        </svg>
                      )}
                    </div>
                    <div>{route.categoryType}</div>
                  </div>
                </div>
              </Link>
            </>
          ))}
        </div>
      </div>
    );
  };

  function onDragStart(
    e: React.DragEvent<HTMLTableRowElement>,
    payload: IQuestion
  ) {
    e.stopPropagation();
    setDraggedQuestion(payload);
  }

  function QTable() {
    return (
      <>
        <table className="table-auto max-w-3xl mx-auto my-6">
          <thead key={"thred"}>
            <tr className="bg-indigo-700 text-white tracking-wide">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Question(s)</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Done</th>
              {started && <th className="px-4 py-2">Solution</th>}
            </tr>
          </thead>
          <tbody key={"tbody"}>
            {questionsState.map((question: IQuestion, index: number) => {
              return (
                <>
                  <tr
                    id={`${question.Problem}-${index}`}
                    draggable={true}
                    onDrag={(e) => onDragStart(e, question)}
                    key={index}
                    className={
                      "dark:bg-gray-300 " +
                      tableRowLogic(index, question) +
                      " cursor-pointer"
                    }
                    // style={{
                    //   backgroundColor: tableRowLogic(index, question),
                    // }}
                  >
                    <td className="border px-4 py-2"> {index + 1} </td>
                    <td className="border px-4 py-2">
                      {" "}
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={question.URL}
                        style={{ color: "#8345E5" }}
                      >
                        {" "}
                        {question.Problem}{" "}
                      </a>
                    </td>
                    <td className="border px-4 py-2">
                      {" "}
                      {question.Done ? "✅Completed" : "❌Incomplete"}{" "}
                    </td>
                    <td className="text-center py-2">
                      <input
                        type="checkbox"
                        onChange={(e) => question.Done}
                        checked={question.Done === true}
                        onClick={() => whenQuestionCompleted(topicName, index)}
                      />
                    </td>
                    {started && (
                      <td className="text-center py-2">
                        <Link
                          to={{
                            pathname: `/${topicName.toLowerCase()}/${question.Problem.replaceAll(
                              " ",
                              "-"
                            )}/solution`,
                            state: {
                              index,
                              question,
                              questionData,
                            },
                          }}
                        >
                          {question.Done ? (
                            <>
                              <button className="text-green-600 bg-white mx-2 font-bold rounded px-2 text-xs">
                                {question.code
                                  ? "View solution"
                                  : "Upload Solution"}
                              </button>
                            </>
                          ) : (
                            <div className="text-red-700">N/A</div>
                          )}
                        </Link>
                      </td>
                    )}
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }

  return (
    <>
      <ToastContainer />
      <div className="text-4xl dark:text-white text-center text-gray-800">
        {" "}
        ✨ {topicName} Problems{" "}
      </div>
      <div className=" text-sm text-center mt-3">
        <span>
          <Link to="/" className="text-blue-600">
            Topics
          </Link>{" "}
          /{" "}
          <span className="bg-black tracking-wide text-white px-2 mx-3 rounded-lg py-1">
            {topicName}
          </span>
        </span>
      </div>
      <div className="my-8 ">
        <SearchBar />

        {/* category List start */}
        <CategoryList />
        {/* category List end */}

        <QTable />
      </div>
    </>
  );
};

export default QStatCard;
