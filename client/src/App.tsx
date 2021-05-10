import React from "react";
import "./App.css";
import { QuestionDataContext2Provider } from "./context/QuestionDataContext2";

function App() {
  return (
    <>
      <QuestionDataContext2Provider />
    </>
  );
}

export default App;
