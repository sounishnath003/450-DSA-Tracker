import React from "react";
import { Error } from "../../components/Alert";
import Success from "../../components/Alert/Success";
import { initialCategoryFilterState } from "../../reducer/category-filter.reducer";
import { useHook } from "./hooks";

const CategoryContext = React.createContext({ ...initialCategoryFilterState });
export const useCategory = () => React.useContext(CategoryContext);

interface CategoryContextProps {
  children: any;
}

const CategoryFilterProvider: React.FC<CategoryContextProps> = ({
  children,
}: CategoryContextProps) => {
  const { categoryFilterState, dispatch } = useHook();
  return (
    <CategoryContext.Provider value={{ ...categoryFilterState, dispatch }}>
      <Error error={categoryFilterState.error} />
      <Success message={categoryFilterState.message} />
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryFilterProvider;
