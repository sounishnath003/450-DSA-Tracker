import React from "react";
import { IQuestionData } from "../../Backend/model/Question-model";
import QTopicCard from "../QTopicCard";

interface Props {
  questionData: IQuestionData[];
  updateData: Function;
}

const Home: React.FC<Props> = ({ questionData, updateData }) => {
  // let updatedQuestionTopicData
  // let questionData: IQuestionData[] = useContext(QuestionDataContext);

  // useEffect(() => {
  //   questionDataContext = questionData;
  // }, [questionDataContext]);

  return (
    <React.Fragment>
      <h2 className="text-4xl text-center">DSA 450 Cracker</h2>
      <div className="text-indigo-700 text-center text-xl tracking-wide uppercase my-4">
        your gateway to crack product based
      </div>
      <div className="mt-8">
        {questionData.length < 1 ? (
          <div>loading....</div>
        ) : (
          <div className="flex d-flex flex-row flex-wrap justify-evenly m-2">
            {" "}
            {questionData.map((quesTopic: IQuestionData, index: number) => (
              <QTopicCard
                questionData={quesTopic}
                updateData={updateData}
                key={index}
              />
            ))}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Home;
