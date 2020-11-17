import React from "react";
import { IQuestionData } from "../../Backend/model/Question-model";

const QStatCard: React.FC<IQuestionData> = (props: IQuestionData) => {
  const { questions } = props;
  console.log(questions);

  return <div>QStatCard</div>;
};

export default QStatCard;
