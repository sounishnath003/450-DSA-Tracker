import React from "react";
import { TrashIcon } from "../../assets/icons";
import { IQuestion } from "../../Backend/model/Question-model";
import { useCategory } from "../../context/CategoryContext";
import env from "../../env";
import BreadCrumb from "../Breadcums";
import { DonePill, PendingPill } from "../Pill";
import Table from "../Table";
import { Tbody, Td } from "../Table/Tbody";
import Thead, { Th } from "../Table/Thead";
import CategoryNavbar from "./CategoryNavbar";

const Category: React.FC = () => {
  const { easyQuestions, mediumQuestions, hardQuestions, dispatch, dismiss } =
    useCategory();

  const pathname: string = window.location.pathname.split("/")[2];
  const [questions, setQuestions] = React.useState<IQuestion[]>([]);

  React.useEffect(() => {
    if (pathname === "easy") setQuestions([...questions, ...easyQuestions]);
    else if (pathname === "medium")
      setQuestions([...questions, ...mediumQuestions]);
    if (pathname === "hard") setQuestions([...questions, ...hardQuestions]);
  }, []);

  function getStyle() {
    return pathname === "easy"
      ? `text-green-500`
      : pathname === "medium"
      ? `text-blue-500`
      : `text-red-500`;
  }

  async function removeFromList(index: number) {
    const updatedQuestionsList = questions.filter(
      (ques: IQuestion, idx: number) => idx !== index
    );

    const promise = await fetch(
      `/proxy/api/category/${pathname}/update`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedQuestionsList),
      }
    );

    if (promise.ok === false) {
      dispatch({ type: "ERROR", payload: { error: promise.statusText } });
      dismiss(() => dispatch({ type: "RESET" }), 3);
      return;
    }
    const resp = await promise.json();
    dispatch({
      type: "ON_CAT_QUESTION_DELETE",
      payload: { questions: resp.allCategoryList, message: resp.message },
    });
    dismiss(() => dispatch({ type: "RESET" }), 3);
    setQuestions(updatedQuestionsList);
  }

  return (
    <React.Fragment>
      <div className="text-4xl dark:text-white text-center text-gray-800 mb-6">
        {" "}
        DSA 450 Cracker
      </div>

      <div
        className={`${getStyle()} dark:text-green-200 text-center text-xl tracking-wide uppercase my-4`}
      >
        your handpicked lists of{" "}
        <span className={`font-semibold bg-blue-50 rounded-md p-2 underline`}>
          {pathname.toLocaleUpperCase()}
        </span>{" "}
        questions
      </div>

      <BreadCrumb root1={"Categories"} root2={pathname} link1={"/"} />
      <CategoryNavbar />

      <Table>
        <Thead>
          <Th title={"Sl.No"} />
          <Th title={"Question(s)"} />
          <Th title={"Status"} />
          <Th title={"Action"} />
        </Thead>
        <Tbody>
          {questions.length > 0 ? (
            questions.map((question: IQuestion, index: number) => (
              <tr key={question.URL + index}>
                <Td>{index}</Td>
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
                  </div>{" "}
                </Td>
                <Td>{question.Done ? <DonePill /> : <PendingPill />}</Td>
                <Td>
                  {" "}
                  <div onClick={() => removeFromList(index)}>
                    <TrashIcon color={"text-gray-600"} size={20} />{" "}
                  </div>
                </Td>
              </tr>
            ))
          ) : (
            <tr className="text-red-500 m-auto">
              <Td> No questions has been added to the category list!. </Td>
            </tr>
          )}
        </Tbody>
      </Table>
    </React.Fragment>
  );
};

export default Category;
