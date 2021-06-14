import React from "react";
import { CustomCategoryFilterContext } from "../../context/CustomCategoryFilterContext";
import TableOrderListing from "./TableOrderListing";

const MediumCategory = () => {
  const { mediumQuestions } = React.useContext(CustomCategoryFilterContext);
  console.log(mediumQuestions);
  return (
    <div>
      <h2 className="text-4xl dark:text-gray-200 text-center">
        DSA 450 Cracker
      </h2>
      <div className="text-blue-600 dark:text-green-200 text-center text-xl tracking-wide uppercase my-4">
        your handpicked lists of{" "}
        <span className="text-blue-500 font-semibold underline">Medium</span>{" "}
        questions
      </div>

      <TableOrderListing questions={mediumQuestions} colorCode="blue" />
    </div>
  );
};

export default MediumCategory;
