export interface AllTopicQuestion {
  status: boolean;
  statusCode: number;
  questions: AllTopicQuestionInterface[];
}

export interface AllTopicQuestionInterface {
  topicName: Topic;
  position: number;
  started: boolean;
  doneQuestions: number;
  questions: QuestionQInterface[];
}

export interface QuestionQInterface {
  Topic: Topic;
  Problem: string;
  Done: boolean;
  URL: string;
}

export enum Topic {
  Array = "Array",
  BackTracking = "BackTracking",
  BinarySearchTrees = "Binary Search Trees",
  BinaryTrees = "Binary Trees",
  BitManipulation = "Bit Manipulation",
  Bst = "BST",
  DynamicProgramming = "Dynamic Programming",
  Graph = "Graph",
  Greedy = "Greedy",
  Heap = "Heap",
  LinkedList = "LinkedList",
  Matrix = "Matrix",
  SearchSort = "Search & Sort",
  SearchingSorting = "Searching & Sorting",
  StacksQueues = "Stacks & Queues",
  String = "String",
  TopicLinkedList = "Linked List",
  Trie = "Trie",
}
