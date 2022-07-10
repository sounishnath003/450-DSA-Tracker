export interface QuestionsByTopic {
  questions: Questions;
}

export interface Questions {
  topicname: Topicname;
  topicInformation: string;
  problems: Problem[];
  solvedProblems: SolvedProblem[];
}

export interface Problem {
  _id: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  problemTitle: string;
  questionId: string;
  problemURL: string;
  topicname: Topicname;
  attemptedCount: number;
}

export interface SolvedProblem {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  questionId: string;
  problemId: string;
  code: string;
  problemInformation: Problem;
}

export enum Topicname {
  Array = 'Array',
  BackTracking = 'BackTracking',
  LinkedList = 'Linked List',
  Matrix = 'Matrix',
  SearchSort = 'Search & Sort',
  StacksQueues = 'Stacks & Queues',
  Strings = 'String',
}
