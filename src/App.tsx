import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import { About } from "./components/About/About";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import QStatCard from "./components/QStatCard";
import { QuestionDataContext } from "./context/QuestionDataContext";
import { useFirstVisit } from "./hooks/useFirstVisit";
import { useQuestionData } from "./hooks/useQuestionData";
import { IRoute, routes } from "./routes/routes";
import FirstVisit from "./components/util/FirstVisit/FirstVisit";
import UploadCode from "./components/QStatCard/UploadCode";

function App() {
  const [questionData, _, updateData] = useQuestionData();
  const [showPopUp, setshowPopUp] = useFirstVisit();

  return (
    <>
      {showPopUp && (
        <FirstVisit showupState={showPopUp} setShowUp={setshowPopUp} />
      )}

      <QuestionDataContext.Provider value={{ questionData, updateData }}>
        <div className="p-1 bg-blue-100"></div>
        <div className="App bg-white dark:bg-gray-800 mx-auto mt-10 p-8 max-w-4xl m-auto ">
          <Switch>
            <Route path="/" exact component={() => <Home />} />
            <Route path="/about" exact component={About} />

            {routes.map((route: IRoute, index: number) => (
              <Route
                key={index}
                exact
                path={route.path}
                component={() => (
                  <QStatCard
                    key={index}
                    questionData={questionData[index]}
                    updateData={updateData}
                  />
                )}
              />
            ))}

            {questionData.map((questiond) =>
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
      </QuestionDataContext.Provider>
    </>
  );
}

export default App;
