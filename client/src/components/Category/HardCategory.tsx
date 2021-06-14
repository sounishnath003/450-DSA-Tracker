import React from "react";
import { CustomCategoryFilterContext } from "../../context/CustomCategoryFilterContext";
import TableOrderListing from "./TableOrderListing";

const HardCategory = () => {
  const { hardQuestions } = React.useContext(CustomCategoryFilterContext);
  console.log(hardQuestions);
  return (
    <div>
      <h2 className="text-4xl dark:text-gray-200 text-center">
        DSA 450 Cracker
      </h2>
      <div className="text-red-600 dark:text-green-200 text-center text-xl tracking-wide uppercase my-4">
        your handpicked lists of{" "}
        <span className="text-red-500 font-semibold underline">Hard</span>{" "}
        questions
      </div>

      <TableOrderListing questions={hardQuestions} colorCode="red" />
    </div>
  );
};

export default HardCategory;
