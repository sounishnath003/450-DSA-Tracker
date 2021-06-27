import {IQuestionData} from "../Backend/model/Question-model";
import React from "react";
import QuestionStatCard from "../components/QuestionStatCard";
import {QuestionData} from "../Backend/db-store/data";

interface Props {
    questionData: IQuestionData;
    updateData: Function;
}

export interface IRoute {
    component: React.FC<Props>;
    path: string;
}

export const RouterMapTopicName = {
    "array": "Array",
    "matrix": "Matrix",
    "string": "String",
    "search-sort": "Search & Sort",
    "linked list": "Linked List",
    "binary trees": "Binary Trees",
    "bst": "BST",
    "greedy": "Greedy",
    "backtracking": "BackTracking",
    "stacks-queues": "Stacks & Queues",
    "heap": "Heap",
    "graph": "Graph",
    "trie": "Trie",
    "dynamic programming": "Dynamic Programming",
    "bit manipulation": "Bit Manipulation"
}


export function generateUrlForQuestion(
    question: string,
    problem: string
): string {
    return `/${question.toLocaleLowerCase()}/${problem
        .substr(0, 10)
        .toLocaleLowerCase()
        .replaceAll(" ", "-")}/solution`;
}

export const routes: IRoute[] = [
    {
        component: QuestionStatCard,
        path: `/${QuestionData[0].topicName.replace(" & ", " ").toLowerCase()}`,
    },
    {
        component: QuestionStatCard,
        path: `/${QuestionData[1].topicName.replace(" & ", " ").toLowerCase()}`,
    },
    {
        component: QuestionStatCard,
        path: `/${QuestionData[2].topicName.replace(" & ", " ").toLowerCase()}`,
    },
    {
        component: QuestionStatCard,
        path: `/${QuestionData[3].topicName.replace(" & ", "-").toLowerCase()}`,
    },
    {
        component: QuestionStatCard,
        path: `/${QuestionData[4].topicName.replace(" & ", " ").toLowerCase()}`,
    },
    {
        component: QuestionStatCard,
        path: `/${QuestionData[5].topicName.replace(" & ", " ").toLowerCase()}`,
    },
    {
        component: QuestionStatCard,
        path: `/${QuestionData[6].topicName.replace(" & ", " ").toLowerCase()}`,
    },
    {
        component: QuestionStatCard,
        path: `/${QuestionData[7].topicName.replace(" & ", " ").toLowerCase()}`,
    },
    {
        component: QuestionStatCard,
        path: `/${QuestionData[8].topicName.replace(" & ", " ").toLowerCase()}`,
    },
    {
        component: QuestionStatCard,
        path: `/${QuestionData[9].topicName.replace(" & ", "-").toLowerCase()}`,
    },
    {
        component: QuestionStatCard,
        path: `/${QuestionData[10].topicName.replace(" & ", " ").toLowerCase()}`,
    },
    {
        component: QuestionStatCard,
        path: `/${QuestionData[11].topicName.replace(" & ", " ").toLowerCase()}`,
    },
    {
        component: QuestionStatCard,
        path: `/${QuestionData[12].topicName.replace(" & ", " ").toLowerCase()}`,
    },
    {
        component: QuestionStatCard,
        path: `/${QuestionData[13].topicName.replace(" & ", " ").toLowerCase()}`,
    },
    {
        component: QuestionStatCard,
        path: `/${QuestionData[14].topicName.replace(" & ", " ").toLowerCase()}`,
    },
];
