import React from "react";
import { IQuestionData } from "../../Backend/model/Question-model";
import { QuestionDataContext2 } from "../../context/QuestionDataContext2";
import CategoryList from "../Category/CategoryList";
import QTopicCard from "../QTopicCard";

const Home: React.FC = () => {
  const { allTopicsData } = React.useContext(QuestionDataContext2);

  return (
    <React.Fragment>
      <h2 className="text-4xl dark:text-gray-200 text-center">
        DSA 450 Cracker
      </h2>
      <div className="text-indigo-700 dark:text-green-200 text-center text-xl tracking-wide uppercase my-4">
        your gateway to crack product based
      </div>

      <CategoryList />

      <div className="mt-8">
        {allTopicsData.length < 1 ? (
          <div>loading....</div>
        ) : (
          <div className="flex d-flex flex-row flex-wrap justify-around m-2">
            {" "}
            {allTopicsData.map((quesTopic: IQuestionData, index: number) => (
              <QTopicCard questionData={quesTopic} key={index} />
            ))}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Home;
