import React from "react";
import { CustomCategoryFilterContext } from "../../context/CustomCategoryFilterContext";
import TableOrderListing from "./TableOrderListing";

function NoQuestionAdded(): JSX.Element {
  return <div className='m-6 p-5 text-xl text-center text-red-400'>
    You Have not added any Questions to the list yet!
  </div>;
}

const EasyCategory = () => {
  const { easyQuestions } = React.useContext(CustomCategoryFilterContext);
  console.log(easyQuestions);

  return (
    <div>
      <h2 className="text-4xl dark:text-gray-200 text-center">
        DSA 450 Cracker
      </h2>
      <div className="text-green-600 dark:text-green-200 text-center text-xl tracking-wide uppercase my-4">
        your handpicked lists of{" "}
        <span className="text-green-500 font-semibold underline">Easy</span>{" "}
        questions
      </div>

      {/* table */}

      {easyQuestions.length > 0 ? (
        <TableOrderListing questions={easyQuestions} colorCode="green" />
      ) : (
        <NoQuestionAdded />
      )}

      {/* table end*/}
    </div>
  );
};

export default EasyCategory;
