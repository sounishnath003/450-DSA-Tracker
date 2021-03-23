import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import "./App.css";
import { AuthHome } from "./components/Auth";
import { QuestionDataContext2Provider } from "./context/QuestionDataContext2";

function App() {
  const { isAuthenticated, user } = useAuth0();
  console.log({ user, isAuthenticated });

  return (
    <>{isAuthenticated ? <QuestionDataContext2Provider /> : <AuthHome />}</>
  );
}

export default App;
