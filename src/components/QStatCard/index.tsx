import React, { useReducer } from "react";
import { Link } from "react-router-dom";
import { IQuestion, IQuestionData } from "../../Backend/model/Question-model";
import { defaultQuesStat, reducer } from "../../Reducer/reducer";

const QStatCard: React.FC<IQuestionData> = (props: IQuestionData) => {
  const { topicName, questions } = props;
  const [state, dispatch] = useReducer(reducer, defaultQuesStat);

  // searchBar component()
  function SearchBar() {
    return (
      <form onSubmit={(e: any) => e.preventDefault()}>
        <div className="text-center">
          <div className="inline-flex">
            <div className="m-auto">
              <input
                type="text"
                placeholder="search questions accordingly"
                className="px-3 py-2 w-64 border font-mono font-bold border-black bg-blue-100"
              />
            </div>
            <div className="m-auto border border-black rounded-tr rounded-br text-white px-3 bg-black py-2">
              <button className="uppercase tracking-wide">Search</button>
            </div>
          </div>
        </div>
      </form>
    );
  }

  function questionCompleted(
    key: string,
    id: number,
    questionData: IQuestionData
  ) {
    dispatch({ type: "COMPLETED", payload: { key, id, questionData } });
    console.log(state);
  }

  // utility function()
  function tableRowLogic(index: number, question: IQuestion): string {
    if (question.Done === true) {
      return `#5AFFA8`;
    }
    return index % 2 === 0 ? "white" : "#fff5fb";
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
            </tr>
          </thead>
          <tbody key={"tbody"}>
            {questions.map((question: IQuestion, index: number) => {
              return (
                <>
                  <tr
                    key={index}
                    style={{ backgroundColor: tableRowLogic(index, question) }}
                  >
                    <td className="border px-4 py-2"> {index + 1} </td>
                    <td className="border px-4 py-2">
                      {" "}
                      <a
                        target="_blank"
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
                        onClick={() => questionCompleted(topicName, props)}
                      />
                    </td>
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

/*

 onClick={(e: any) =>
                          questionCompleted(
                            topicName.replace(/[^A-Z0-9]+/gi, "_"),
                            index
                          )
                        }

*/
