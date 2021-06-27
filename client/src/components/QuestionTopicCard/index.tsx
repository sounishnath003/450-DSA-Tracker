import React from "react";
import {useQuestion} from "../../context/QuestionContext";
import {IQuestionData} from "../../Backend/model/Question-model";
import TopicCard from "./topic-card";

const QuestionTopicCard: React.FC = () => {
    const {allQuestions, selectedTopic} = useQuestion();
    return (
        <React.Fragment>
            <div className="flex d-flex flex-row flex-wrap justify-around m-2">
                {allQuestions.map((questionTopic: IQuestionData, index: number) => <TopicCard
                    key={index}
                    questionData={questionTopic}/>)}
            </div>
            <pre> SELECTED TOPIC: {selectedTopic} </pre>
        </React.Fragment>
    )
}
export default QuestionTopicCard;