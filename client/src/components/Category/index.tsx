import React from "react";
import {useCategory} from "../../context/CategoryContext";

const Category: React.FC = () => {
    const {selectedCategoryType, selectedCategoryQuestions} = useCategory();
    return <React.Fragment>
        <h3 className="text-xl"> {selectedCategoryType} </h3>
        <div>
            <pre># {JSON.stringify(selectedCategoryQuestions, null, 3)} </pre>
        </div>
    </React.Fragment>
}

export default Category