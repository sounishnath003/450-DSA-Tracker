import React from 'react';
import {useHistory} from "react-router-dom";
import {IQuestion} from "../../Backend/model/Question-model";
import Breadcrumb from "../Breadcums";

interface UploadCodeProps {
}

const UploadCode = ({}: UploadCodeProps) => {
    const {location, goBack} = useHistory();
    const [question, setQuestion] = React.useState<IQuestion>((location as any).state.question);
    const questionIndex: number = (location as any).state.qindex;
    const topicName: string = (location as any).state.topicName;

    function getLink1() {
        return `/${topicName
            .replace(" & ", "-")
            .toLowerCase()}`
    }

    return <React.Fragment>
        <div className="text-3xl dark:text-white text-center text-gray-800 mb-6"> 🪝🪙 {question.Problem} Problems</div>
        <Breadcrumb root1={question.Topic} link1={getLink1()} root2={question.Problem}/>
        <pre> {JSON.stringify(location, null, 3)} </pre>
    </React.Fragment>
}

export default UploadCode;