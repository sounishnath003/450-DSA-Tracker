import React from "react";
import { Link } from "react-router-dom";
import { EasyIcon, HardIcon, MediumIcon, SavedIcon } from "../../assets/icons";
import { countOfQuestionsCompletion } from "../../Backend/services/database";
import { CustomCategoryFilterContext } from "../../context/CustomCategoryFilterContext";

type ICategoryRoute = { path: string; categoryType: string; icon: JSX.Element };

const CategoryList = () => {
  const [count, setCount] = React.useState(0);
  const { easyQuestions, mediumQuestions, hardQuestions } = React.useContext(
    CustomCategoryFilterContext
  );
  const routes: ICategoryRoute[] = [
    {
      path: "category-lists/easy",
      icon: EasyIcon(),
      categoryType: `Easy ${easyQuestions.length}`,
    },
    {
      path: "category-lists/medium",
      icon: MediumIcon(),
      categoryType: `Medium ${mediumQuestions.length}`,
    },
    {
      path: "category-lists/hard",
      icon: HardIcon(),
      categoryType: `Hard ${hardQuestions.length}`,
    },
    {
      path: "track/progress",
      icon: SavedIcon(),
      categoryType: `Solved ${count}`,
    },
  ];

  React.useEffect(() => {
    countOfQuestionsCompletion((c: number) => setCount(c));
    return () => {setCount(count)};
  }, []);

  return (
    <div className="my-3">
      <div className="flex justify-evenly space-x-4">
        {routes.map((route: ICategoryRoute, index) => (
          <>
            <Link to={route.path}>
              <div
                key={index}
                className={`items-center px-6 py-2 border-2 ${
                  index === 0
                    ? `border-green-400 hover:bg-green-200`
                    : index === 1
                    ? "border-blue-400 hover:bg-blue-200"
                    : `border-red-400 hover:bg-red-200`
                } cursor-pointer rounded-lg shadow-lg`}
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

export default CategoryList;
