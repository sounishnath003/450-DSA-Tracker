import React from "react";
import { Route, Switch } from "react-router-dom";
import { QuestionData } from "../Backend/db-store/data";
import { IQuestionData } from "../Backend/model/Question-model";
import { About } from "../components/About/About";
import EasyCategory from "../components/Category/EasyCategory";
import HardCategory from "../components/Category/HardCategory";
import MediumCategory from "../components/Category/MediumCategory";
import Footer from "../components/Footer/Footer";
import Home from "../components/Home/Home";
import QStatCard from "../components/QStatCard";
import UploadCode from "../components/QStatCard/UploadCode";
import { AllTopicQuestion } from "../interfaces";
import {
  initialState,
  QuestionDataContextState,
} from "../Reducer/questionDataReducer";
import { generateUrlForQuestion, IRoute, routes } from "../routes/routes";

export const QuestionDataContext2 =
  React.createContext<QuestionDataContextState>(initialState);

export const useQuestionDataContext = () =>
  React.useContext(QuestionDataContext2);

export function QuestionDataContext2Provider(): JSX.Element {
  // * Globally declared the dummyData with all the 450Questions
  const [allTopicsData, setAllTopicsData] =
    React.useState<IQuestionData[]>([]);

  async function updateData(parentIndex: number, a: any) {
    console.log(`update data called!!`);
    console.log({ parentIndex, a });

    const updatedAllTopicData: IQuestionData[] = [];

    allTopicsData.map((topicData: IQuestionData, idx: number) => {
      if (parentIndex === idx) {
        updatedAllTopicData.push(a);
      } else {
        updatedAllTopicData.push(topicData);
      }
    });

    const resp = await (
      await fetch(`http://localhost:5000/api/questions/update-progress`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedAllTopicData),
      })
    ).json();
    // setAllTopicsData(resp.questions);
    console.log({ resp });
  }

  const funk2 = async (abortController: AbortController) => {
    const resp: AllTopicQuestion = await (
      await fetch(`http://localhost:5000/api/questions/all`, {
        signal: abortController.signal,
        credentials: "include",
      })
    )
      .json()
      .catch((err) => {
        if (err.name !== "AbortError") {
          window.alert(`Internet Connection Error! Please refresh page!`);
        }
      });
    setAllTopicsData(resp.questions);
    console.log({ allTopicsData });
  };

  React.useEffect(() => {
    const abortController = new AbortController();
    funk2(abortController);
    return () => abortController.abort();
  }, []);

  return (
    <QuestionDataContext2.Provider value={{ allTopicsData, updateData }}>
      {" "}
      <div className="p-1 bg-blue-100"></div>
      <div className="App bg-white dark:bg-gray-800 mx-auto mt-10 p-8 max-w-4xl m-auto ">
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/about" exact component={About} />
          <Route path="/category-lists/easy" exact component={EasyCategory} />
          <Route
            path="/category-lists/medium"
            exact
            component={MediumCategory}
          />
          <Route path="/category-lists/hard" exact component={HardCategory} />
          <Route path="track/progress" exact />

          {routes.map((route: IRoute, index: number) => (
            <Route
              key={index}
              exact
              path={route.path}
              component={() => (
                <QStatCard
                  questionData={allTopicsData[index]}
                  parentIndex={index}
                  key={route.path}
                />
              )}
            />
          ))}

          {allTopicsData.map((questiond) =>
            questiond.questions.map((question) => (
              <Route
                exact
                key={question.Problem}
                path={generateUrlForQuestion(
                  questiond.topicName,
                  question.Problem
                )}
                component={UploadCode}
              />
            ))
          )}
        </Switch>
      </div>
      <Footer />
    </QuestionDataContext2.Provider>
  );
}
