import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import { QuestionData } from "./Backend/db-store/data";
import Home from "./components/Home/Home";
import { QuestionDataContext } from "./context/QuestionDataContext";

function App() {
  return (
    <QuestionDataContext.Provider value={QuestionData}>
      <div className="App bg-white mx-auto mt-10 p-8 max-w-4xl m-auto ">
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </div>
    </QuestionDataContext.Provider>
  );
}

export default App;
