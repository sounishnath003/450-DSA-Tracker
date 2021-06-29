import React from "react";
import {
  customCategoryFilterReducer,
  CustomCategoryFilterState,
  initialState,
} from "../Reducer/customCategoryFilterReducer";

export const CustomCategoryFilterContext =
  React.createContext<CustomCategoryFilterState>({
    easyQuestions: [],
    mediumQuestions: [],
    hardQuestions: [],
    dispatch: () => {},
  });

// ** The Component which stores all customList modifier questions
export function CustomCategoryFilterProvider({ children }: any): JSX.Element {
  const [state, dispatch] = React.useReducer(
    customCategoryFilterReducer,
    initialState
  );

  React.useEffect(() => {
    const mk = async function () {
      // const easy: any = await getCustomizedListOfQuestionsFor(`easy`);
      // const medium: any = await getCustomizedListOfQuestionsFor(`medium`);
      // const hard: any = await getCustomizedListOfQuestionsFor(`hard`);
      // dispatch({
      //   type: ON_INITIAL_LOAD,
      //   payload: {
      //     easy: easy === null ? [] : easy.questions,
      //     medium: medium === null ? [] : medium.questions,
      //     hard: hard === null ? [] : hard.questions,
      //   },
      // });
    };
    setTimeout(() => {
      mk();
    }, 1300);

    return () => clearTimeout(mk as any);
  }, []);

  return (
    <>
      <CustomCategoryFilterContext.Provider value={{ ...state, dispatch }}>
        {children}
      </CustomCategoryFilterContext.Provider>
    </>
  );
}
