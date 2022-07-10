export interface AllProblemsInterface {
  questions: Question[];
}

export interface Question {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  topicname: Topicname;
  topicInformation: string;
  problems: Problem[];
  totalProblems: number;
}

export interface Problem {
  _id: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  problemTitle: string;
  problemURL: string;
  topicname: Topicname;
  difficultyLevel: string;
  questionInformation: string;
  upvoted: number;
  downvoted: number;
  __v: number;
}

export enum Topicname {
  Array = 'Array',
  BackTracking = 'BackTracking',
  BinaryTrees = 'Binary Trees',
  BitManipulation = 'Bit Manipulation',
  Bst = 'BST',
  DynamicProgramming = 'Dynamic Programming',
  Graph = 'Graph',
  Greedy = 'Greedy',
  Heap = 'Heap',
  LinkedList = 'Linked List',
  Matrix = 'Matrix',
  SearchSort = 'Search & Sort',
  StacksQueues = 'Stacks & Queues',
  Strings = 'String',
  Trie = 'Trie',
}
