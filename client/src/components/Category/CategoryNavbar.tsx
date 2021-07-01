import React from "react";
import {Link} from "react-router-dom";
import {EasyIcon, HardIcon, MediumIcon, SavedIcon} from "../../assets/icons";
import {useCategory} from "../../context/CategoryContext";
import {useQuestion} from "../../context/QuestionContext";
import useDragDropHook from "./useDragDrop.hook";

type CategoryNavbarType = {
    path: string;
    categoryTypeWithNumber: string;
    icon: JSX.Element;
};

const CategoryNavbar: React.FC = () => {
    const {easyQuestions, mediumQuestions, hardQuestions, dispatch} =
        useCategory();
    const {totalSolvedQuestion} = useQuestion();
    const categories: CategoryNavbarType[] = [
        {
            path: "/category-lists/easy",
            icon: <EasyIcon/>,
            categoryTypeWithNumber: `Easy ${easyQuestions.length}`,
        },
        {
            path: "/category-lists/medium",
            icon: <MediumIcon/>,
            categoryTypeWithNumber: `Medium ${mediumQuestions.length}`,
        },
        {
            path: "/category-lists/hard",
            icon: <HardIcon/>,
            categoryTypeWithNumber: `Hard ${hardQuestions.length}`,
        },
        {
            path: "/progress/stats",
            icon: <SavedIcon/>,
            categoryTypeWithNumber: `Solved ${totalSolvedQuestion}`,
        },
    ];
    const {onDrop, onDragOver} = useDragDropHook();

    function generateDispatch(index: number) {
        if (index === 0) {
            dispatch({
                type: "ON_CATEGORY_SELECT",
                payload: {
                    selectedCategoryType: "easy",
                    selectedCategoryQuestions: easyQuestions,
                },
            });
        } else if (index === 1) {
            dispatch({
                type: "ON_CATEGORY_SELECT",
                payload: {
                    selectedCategoryType: "medium",
                    selectedCategoryQuestions: mediumQuestions,
                },
            });
        } else {
            dispatch({
                type: "ON_CATEGORY_SELECT",
                payload: {
                    selectedCategoryType: "hard",
                    selectedCategoryQuestions: hardQuestions,
                },
            });
        }
    }

    return (
        <React.Fragment>
            <div className="my-6">
                <div className="flex justify-evenly space-x-4">
                    {categories.map((category: CategoryNavbarType, index: number) => (
                        <Link key={category.path} to={category.path}>
                            <div
                                className={`items-center px-6 py-2 border-2 ${
                                    index === 0
                                        ? `border-green-400 hover:bg-green-200`
                                        : index === 1
                                        ? "border-blue-400 hover:bg-blue-200"
                                        : index === 2
                                            ? `border-red-400 hover:bg-red-200`
                                            : `border-yellow-400 hover:bg-yellow-200`
                                } cursor-pointer rounded-lg shadow-lg`}
                                id={index === 0 ? `easy` : index === 1 ? `medium` : `hard`}
                                onDragOver={(event) => onDragOver(event)}
                                onDrop={(event) => onDrop(event)}
                            >
                                <div
                                    onClick={() => generateDispatch(index)}
                                    className="flex space-x-1"
                                >
                                    <div>{category.icon}</div>
                                    <div>{category.categoryTypeWithNumber}</div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </React.Fragment>
    );
};

export default CategoryNavbar;
