import React from "react";
import {categoryFilterReducer, initialCategoryFilterState} from "../../reducer/category-filter.reducer";
import {Error} from "../../components/Alert";
import Success from "../../components/Alert/Success";
import env from '../../env';

const abortController: AbortController = new AbortController();

const urls = [fetch(`${env.API_URL}/api/category/easy/all`, {
    credentials: "include",
    signal: abortController.signal
}), fetch(`${env.API_URL}/api/category/medium/all`, {
    credentials: "include",
    signal: abortController.signal
}), fetch(`${env.API_URL}/api/category/hard/all`, {
    credentials: "include",
    signal: abortController.signal
})]

const CategoryContext = React.createContext({...initialCategoryFilterState});
export const useCategory = () => React.useContext(CategoryContext);

interface CategoryContextProps {
    children: any
}

const CategoryFilterProvider: React.FC<CategoryContextProps> = ({children}: CategoryContextProps) => {

    const [categoryFilterState, dispatch] = React.useReducer(categoryFilterReducer, initialCategoryFilterState);

    async function getAllCategoryListsQuestions() {
        const [easyResp, mediumResp, hardResp] = await Promise.all(urls);
        const easyQuestions = (await easyResp.json()).categorizedQuestions;
        const mediumQuestions = (await mediumResp.json()).categorizedQuestions;
        const hardQuestions = (await hardResp.json()).categorizedQuestions;

        dispatch({type: "GET_ALL_CATEGORY_LISTS", payload: {easyQuestions, mediumQuestions, hardQuestions}});
    }

    React.useEffect(() => {
        getAllCategoryListsQuestions();
        return () => abortController.abort();
    }, [])


    return <CategoryContext.Provider value={{...categoryFilterState, dispatch}}>
        <Error error={categoryFilterState.error}/>
        <Success message={categoryFilterState.message}/>
        {children}
    </CategoryContext.Provider>
}

export default CategoryFilterProvider;