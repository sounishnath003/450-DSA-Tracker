import React from "react";
import { IQuestion } from "../../Backend/model/Question-model";
import { useCategory } from "../../context/CategoryContext";

const Category: React.FC = () => {
  const {
    selectedCategoryType,
    easyQuestions,
    mediumQuestions,
    hardQuestions,
  } = useCategory();

  const pathname: string = window.location.pathname.split("/")[2];
  const [questions, setQuestions] = React.useState<IQuestion[]>([]);

  React.useEffect(() => {
    if (pathname === "easy") setQuestions([...questions, ...easyQuestions]);
    else if (pathname === "medium")
      setQuestions([...questions, ...mediumQuestions]);
    if (pathname === "hard") setQuestions([...questions, ...hardQuestions]);   
  }, []);

  return (
    <React.Fragment>
      <h3 className="text-xl"> {selectedCategoryType} </h3>
      <div>
        <pre># {JSON.stringify(questions, null, 3)} </pre>
      </div>
    </React.Fragment>
  );
};

export default Category;
