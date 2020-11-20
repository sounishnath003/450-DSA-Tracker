import React, { useContext, useEffect } from "react";
import { IQuestionData } from "../../Backend/model/Question-model";
import { QuestionDataContext } from "../../context/QuestionDataContext";
import QTopicCard from "../QTopicCard";

const Home: React.FC<IQuestionData[]> = (questionData: IQuestionData[]) => {
  // let updatedQuestionTopicData
  let questionDataContext: IQuestionData[] = useContext(QuestionDataContext);

  useEffect(() => {
    questionDataContext = questionData;
  }, [questionDataContext]);

  return (
    <React.Fragment>
      <h2 className="text-4xl text-center">DSA 450 Cracker</h2>
      <div className="text-indigo-700 text-center text-xl tracking-wide uppercase my-4">
        your gateway to crack product based
      </div>
      <div className="mt-8">
        {questionDataContext.length < 1 ? (
          <div>loading....</div>
        ) : (
          <div className="flex d-flex flex-row flex-wrap justify-evenly m-2">
            {" "}
            {questionDataContext.map(
              (quesTopic: IQuestionData, index: number) => (
                <QTopicCard {...quesTopic} key={index} />
              )
            )}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Home;
