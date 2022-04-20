import React from "react";
import { QuestionsProvider } from "../../context/QuestionContext";

interface HomeProps {}

const Home: React.FC = ({}: HomeProps) => {
  return <QuestionsProvider>{/*<Header/>*/} </QuestionsProvider>;
};

export default Home;
