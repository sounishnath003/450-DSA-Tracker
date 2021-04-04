import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { QuestionDataContext2Provider } from "./context/QuestionDataContext2";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <QuestionDataContext2Provider>
        <App />
      </QuestionDataContext2Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);