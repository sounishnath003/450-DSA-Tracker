import React from "react";
import { CustomCategoryFilterContext } from "../../context/CustomCategoryFilterContext";

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

      <div className="my-5 max-w-xl">{JSON.stringify(easyQuestions)}</div>
    </div>
  );
};

export default EasyCategory;