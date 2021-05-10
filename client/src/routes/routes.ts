import {QuestionData} from "../Backend/db-store/data";
import {IQuestionData} from "../Backend/model/Question-model";
import QStatCard from "../components/QStatCard";

interface Props {
    questionData: IQuestionData;
    updateData: Function;
}

export interface IRoute {
    component: React.FC<Props>;
    path: string;
}

export function generateUrlForQuestion(question: string , problem: string): string {
    return `/${question.toLocaleLowerCase ()}/${problem.substr (0 , 10).toLocaleLowerCase ().replaceAll (' ' , '-')}/solution`
}

export const routes: IRoute[] = [
    {
        component :QStatCard ,
        path :`/${QuestionData[0].topicName.replace (" & " , " ").toLowerCase ()}` ,
    } ,
    {
        component :QStatCard ,
        path :`/${QuestionData[1].topicName.replace (" & " , " ").toLowerCase ()}` ,
    } ,
    {
        component :QStatCard ,
        path :`/${QuestionData[2].topicName.replace (" & " , " ").toLowerCase ()}` ,
    } ,
    {
        component :QStatCard ,
        path :`/${QuestionData[3].topicName.replace (" & " , "-").toLowerCase ()}` ,
    } ,
    {
        component :QStatCard ,
        path :`/${QuestionData[4].topicName.replace (" & " , " ").toLowerCase ()}` ,
    } ,
    {
        component :QStatCard ,
        path :`/${QuestionData[5].topicName.replace (" & " , " ").toLowerCase ()}` ,
    } ,
    {
        component :QStatCard ,
        path :`/${QuestionData[6].topicName.replace (" & " , " ").toLowerCase ()}` ,
    } ,
    {
        component :QStatCard ,
        path :`/${QuestionData[7].topicName.replace (" & " , " ").toLowerCase ()}` ,
    } ,
    {
        component :QStatCard ,
        path :`/${QuestionData[8].topicName.replace (" & " , " ").toLowerCase ()}` ,
    } ,
    {
        component :QStatCard ,
        path :`/${QuestionData[9].topicName.replace (" & " , "-").toLowerCase ()}` ,
    } ,
    {
        component :QStatCard ,
        path :`/${QuestionData[10].topicName.replace (" & " , " ").toLowerCase ()}` ,
    } ,
    {
        component :QStatCard ,
        path :`/${QuestionData[11].topicName.replace (" & " , " ").toLowerCase ()}` ,
    } ,
    {
        component :QStatCard ,
        path :`/${QuestionData[12].topicName.replace (" & " , " ").toLowerCase ()}` ,
    } ,
    {
        component :QStatCard ,
        path :`/${QuestionData[13].topicName.replace (" & " , " ").toLowerCase ()}` ,
    } ,
    {
        component :QStatCard ,
        path :`/${QuestionData[14].topicName.replace (" & " , " ").toLowerCase ()}` ,
    } ,

];
