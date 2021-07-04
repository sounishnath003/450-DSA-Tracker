/* eslint-disable @typescript-eslint/ban-types */
import React from "react";
import { QuestionData } from "../Backend/db-store/data";
import { IQuestionData } from "../Backend/model/Question-model";
import Category from "../components/Category";
import QuestionStatCard from "../components/QuestionStatCard";

interface Props {
  questionData: IQuestionData;
  updateData: Function;
}

export interface IRoute {
  component: React.FC<Props>;
  path: string;
}

export const RouterMapTopicName = {
  array: "Array",
  matrix: "Matrix",
  string: "String",
  "search-sort": "Search & Sort",
  "linked list": "Linked List",
  "binary trees": "Binary Trees",
  bst: "BST",
  greedy: "Greedy",
  backtracking: "BackTracking",
  "stacks-queues": "Stacks & Queues",
  heap: "Heap",
  graph: "Graph",
  trie: "Trie",
  "dynamic programming": "Dynamic Programming",
  "bit manipulation": "Bit Manipulation",
};

export function generateUrlForQuestion(
  question: string,
  problem: string
): string {
  return `/${question.toLocaleLowerCase()}/${problem
    .substr(0, 10)
    .toLocaleLowerCase()
    .replaceAll(" ", "-")}/solution`;
}

export const questionTopicRoutes: IRoute[] = [
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

export interface ICategoryRoutes<T> extends IRoute {
  key: T;
  path: string;
  component: React.FC;
}

export const categoriesRoutes: ICategoryRoutes<string>[] = [
  { key: "easy", path: "/category-lists/easy", component: Category },
  { key: "medium", path: "/category-lists/medium", component: Category },
  { key: "hard", path: "/category-lists/hard", component: Category },
  { key: "progressStat", path: "/progress/stats", component: Category },
];
