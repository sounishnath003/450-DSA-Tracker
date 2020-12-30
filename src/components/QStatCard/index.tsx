import React, { useEffect, useReducer, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IQuestion, IQuestionData } from "../../Backend/model/Question-model";
import { defaultQuesStat, reducer } from "../../Reducer/reducer";
import UploadCode from "./UploadCode";
import { tableRowLogic } from "./utils/utility";

/*
  questionData: IQuestionData; // data: IQuestion
  updateData: Function; // updatedData()
 */

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

  //Modal Open for upload solution
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // @COMPLETED_ACTION - useEffect questionCompleted Update

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
              {started && <th className="px-4 py-2">View Solution</th>}
            </tr>
          </thead>
          <tbody key={"tbody"}>
            {questionsState.map((question: IQuestion, index: number) => {
              return (
                <>
                  <tr
                    key={index}
                    style={{
                      backgroundColor: tableRowLogic(index, question),
                    }}
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
                    {started && <td className="text-center py-2">
                      {question.Done ? (
                        <>
                          <button className="text-green-600 bg-white mx-2 font-bold rounded px-2 text-xs" onClick={() => setModalIsOpen(!modalIsOpen)} >{question.haveSolution ? "View solution" : "Upload Solution"}</button>
                            <UploadCode index={index} updateData={updateData} questionData={questionData} hasSolution={question.haveSolution} solutionCode={question.solutionCode} modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
                        </>
                      ) : (
                          <div className="text-red-700">N/A</div>
                        )}
                    </td>
                    }
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
      <div className="text-4xl text-center text-gray-800">
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
        <QTable />
      </div>
    </>
  );
};

export default QStatCard;
