import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IQuestion, IQuestionData } from "../../Backend/model/Question-model";
import { useQuestionDataContext } from "../../context/QuestionDataContext2";
import { useCustomFilterDragAndDropper } from "../../hooks/useCustomFilterDragAndDropper";
import { tableRowLogic } from "./utils/utility";

/* *
 * questionData: IQuestionData; // data: IQuestion
 * updateData: Function; // updatedData()
 *
 */

type ICategoryRoute = { path: string; categoryType: string; icon: JSX.Element };

interface Props {
  questionData: IQuestionData; // data: IQuestion
}

const QStatCard: React.FC<Props> = ({ questionData }) => {
  const { allTopicsData } = useQuestionDataContext();
  const { topicName, questions, started } = questionData;
  const [questionsState, setQuestionsState] = useState<IQuestion[]>(questions);
  const [searchText, setSearchText] = React.useState<string>("");
  // no of question ~ selected realtime
  const [selected, setSelected] = useState<number[]>([]);

  // ? @COMPLETED_ACTION - useEffect questionCompleted Update

  // *** Dragable questionState hooking onto it***
  const [draggedQuestion, setDraggedQuestion] = React.useState<IQuestion>();

  React.useEffect(() => {
    const abortController = new AbortController();
    const funk = async () => {
      const { questions } = await (
        await fetch(`http://localhost:5000/api/questions/topic/${topicName}`, {
          credentials: "include",
          signal: abortController.signal,
        })
      )
        .json()
        .catch((err) => {
          if (err.name !== "AbortController") {
            window.alert(`Internet Connection Error! Please refresh page!`);
          }
        });
      setQuestionsState([...questions[0].questions]);
    };
    funk();
    return () => abortController.abort();
  }, []);

  // * searchBar component()
  function SearchBar(this: undefined) {
    function handleSearch(e: any) {
      setSearchText((f) => (f = e.target.value.toLowerCase()));
    }
    return (
      <form>
        <div className="text-center">
          <div className="inline-flex">
            <div className="m-auto">
              <input
                value={searchText}
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

  async function whenQuestionCompleted(index: number) {
    const questions: IQuestionData[] = [];

    for (const questionTopic of allTopicsData) {
      if (questionTopic.topicName === topicName) {
        const selectedQuestion: IQuestion = {
          ...questions[index],
          Done: !questionTopic.questions[index].Done,
        };
        const updatedQuestions: IQuestion[] = questionTopic.questions.map(
          (ques: IQuestion, idx) => (idx === index ? selectedQuestion : ques)
        );

        const finalPayload: IQuestionData = {
          ...questionTopic,
          doneQuestions: questionTopic.doneQuestions + 1,
          started: true,
          questions: updatedQuestions,
        };

        questions.push(finalPayload);
      } else {
        questions.push(questionTopic);
      }
    }
    
    const resp = await (
      await fetch(`http://localhost:5000/api/questions/update-progress`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(questions),
      })
    ).json();
  }

  const CategoryList = () => {
    const { onDragOver, onDrop, routes } = useCustomFilterDragAndDropper();

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
                  onDragOver={(event) =>
                    onDragOver(event, draggedQuestion as IQuestion)
                  }
                  onDrop={(event) =>
                    onDrop(event, draggedQuestion as IQuestion)
                  }
                >
                  <div className="flex space-x-1">
                    <div>{route.icon}</div>
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

  // ** OnDragStart Event - user start dragging...
  function onDragStart(
    e: React.DragEvent<HTMLTableRowElement>,
    payload: IQuestion
  ) {
    e.stopPropagation();
    e.preventDefault();
    setDraggedQuestion(payload);
  }

  function QTable() {
    return (
      <>
        <table className="table-auto max-w-3xl mx-auto  my-6">
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
            {questionsState
              .filter((q) => q.Problem.toLowerCase().includes(searchText))
              .map((question: IQuestion, index: number) => {
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
                          onClick={() => whenQuestionCompleted(index)}
                        />
                      </td>
                      {started && (
                        <td className="text-center py-2">
                          <Link
                            to={{
                              pathname: `/${topicName.toLocaleLowerCase()}/${question.Problem.substr(
                                0,
                                10
                              )
                                .toLocaleLowerCase()
                                .replaceAll(" ", "-")}/solution`,
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
        <CategoryList />
        <QTable />
        {/* <pre> {JSON.stringify(questionsState, null, 3)} </pre> */}
      </div>
    </>
  );
};

export default QStatCard;
