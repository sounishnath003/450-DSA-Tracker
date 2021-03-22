import React from "react";
import { Route, Switch } from "react-router-dom";
import { QuestionData } from "../Backend/db-store/data";
import { IQuestionData } from "../Backend/model/Question-model";
import { getData, updateDocumentStateInDB } from "../Backend/services/database";
import { About } from "../components/About/About";
import EasyCategory from "../components/Category/EasyCategory";
import HardCategory from "../components/Category/HardCategory";
import MediumCategory from "../components/Category/MediumCategory";
import Footer from "../components/Footer/Footer";
import Home from "../components/Home/Home";
import QStatCard from "../components/QStatCard";
import UploadCode from "../components/QStatCard/UploadCode";
import FirstVisit from "../components/util/FirstVisit/FirstVisit";
import { useFirstVisit } from "../hooks/useFirstVisit";
import {
  initialState,
  IQuestionDataContextState,
  questionDataReducer,
} from "../Reducer/questionDataReducer";
import { IRoute, routes } from "../routes/routes";
import { CustomCategoryFilterProvider } from "./CustomCategoryFilterContext";

export const QuestionDataContext2 = React.createContext<IQuestionDataContextState>(
  initialState
);

export function QuestionDataContext2Provider(): JSX.Element {
  // * Globally declared the dummyData with all the 450Questions
  const [allTopicsData, setAllTopicsData] = React.useState<IQuestionData[]>(
    QuestionData
  );

  // * The Main ReducerActionDispatcher declared
  const [state, questionActionDispatcher] = React.useReducer(
    questionDataReducer,
    initialState
  );

  // * For Prompting User when
  // * he/she visits for the firstTym
  // * After Updating the site in production
  const [showPopUp, setshowPopUp] = useFirstVisit();

  // * Special Functions
  function updateData(key: any, topicData: any, topicPosition: any) {
    let reGeneratedQData: IQuestionData[] = allTopicsData.map(
      (topic: IQuestionData, index: number) => {
        if (index === topicPosition) {
          updateDocumentStateInDB(key, topicData);
          // return { ...topicData };
          return {
            topicName: topic.topicName,
            position: topic.position,
            ...topicData,
          };
        } else {
          return topic;
        }
      }
    );

    // * Setting up new Updated Content-data
    // * to `allTopicsData` variable
    setAllTopicsData(reGeneratedQData);
  }

  React.useEffect(() => {
    const funk = async () => {
      console.log(`loading from ReducerActionDispatcher State`);
      getData((qData: IQuestionData[]) => setAllTopicsData(qData));
    };
    funk();
  }, []);

  return (
    <React.Fragment>
      {showPopUp && (
        <FirstVisit showupState={showPopUp} setShowUp={setshowPopUp} />
      )}

      <QuestionDataContext2.Provider
        value={{
          ...state,
          allTopicsData,
          questionActionDispatcher,
          updateData,
        }}
      >
        <CustomCategoryFilterProvider>
          <div className="p-1 bg-blue-100"></div>
          <div className="App bg-white dark:bg-gray-800 mx-auto mt-10 p-8 max-w-4xl m-auto ">
            <Switch>
              <Route path="/" exact component={() => <Home />} />
              <Route path="/about" exact component={About} />
              <Route
                path="/category-lists/easy"
                exact
                component={EasyCategory}
              />
              <Route
                path="/category-lists/medium"
                exact
                component={MediumCategory}
              />
              <Route
                path="/category-lists/hard"
                exact
                component={HardCategory}
              />
              <Route path="track/progress" exact />

              {routes.map((route: IRoute, index: number) => (
                <Route
                  key={index}
                  exact
                  path={route.path}
                  component={() => (
                    <QStatCard
                      key={index}
                      questionData={allTopicsData[index]}
                    />
                  )}
                />
              ))}

              {allTopicsData.map((questiond) =>
                questiond.questions.map((question) => (
                  <Route
                    exact
                    key={question.Problem}
                    path={`/${questiond.topicName.toLowerCase()}/${question.Problem.replaceAll(
                      " ",
                      "-"
                    )}/solution`}
                    component={UploadCode}
                  />
                ))
              )}
            </Switch>
          </div>
          <Footer />
        </CustomCategoryFilterProvider>
      </QuestionDataContext2.Provider>
    </React.Fragment>
  );
}
