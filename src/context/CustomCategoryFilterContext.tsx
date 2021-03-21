import React from "react";
import {
  customCategoryFilterReducer,
  CustomCategoryFilterState,
  initialState,
} from "../Reducer/customCategoryFilterReducer";

export const CustomCategoryFilterContext = React.createContext<CustomCategoryFilterState>(
  {
    easyQuestions: [],
    mediumQuestions: [],
    hardQuestions: [],
    dispatch: () => {},
  }
);

// ** The Component which stores all customList modifier questions
export function CustomCategoryFilterProvider({ children }: any): JSX.Element {
  const [state, dispatch] = React.useReducer(
    customCategoryFilterReducer,
    initialState
  );

  React.useEffect(() => {
    
  }, [])

  return (
    <>
      <CustomCategoryFilterContext.Provider value={{ ...state, dispatch }}>
        {children}
      </CustomCategoryFilterContext.Provider>
    </>
  );
}
