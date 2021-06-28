import React from "react";
import {useQuestion} from "../../context/QuestionContext";
import {IQuestionData} from "../../Backend/model/Question-model";
import TopicCard from "./topic-card";
import Header from "../Header";
import CategoryNavbar from "../Category/CategoryNavbar";

const QuestionTopicCard: React.FC = () => {
    const {allQuestions, dispatch} = useQuestion();
    return (
        <React.Fragment>
            <Header/>
            <CategoryNavbar/>
            <div className="flex d-flex flex-row flex-wrap justify-around m-2">
                {allQuestions.map((questionTopic: IQuestionData, index: number) =>
                    <div key={index}
                         onClick={() => dispatch({type: "SELECT_QUESTION_TOPIC", payload: {index, questionTopic}})}>
                        <TopicCard
                            questionData={questionTopic}/>
                    </div>)}
            </div>
        </React.Fragment>
    )
}
export default QuestionTopicCard;