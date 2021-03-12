import React from "react";
import "./App.css";
import { QuestionDataContext2Provider } from "./context/QuestionDataContext2";

function App() {

  return (
    <>
      <QuestionDataContext2Provider>
        <h2>New Contextual State Introduced</h2>
      </QuestionDataContext2Provider>
    </>
  );
}

export default App;
