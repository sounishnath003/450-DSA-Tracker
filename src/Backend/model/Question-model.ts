export interface IQuestion {
  Topic: string;
  Problem: string;
  Done: boolean;
  URL: string;
  haveSolution?: boolean | null;
  code?: string | null;
}

export interface IQuestionData {
  topicName: string;
  position: number;
  started: boolean;
  doneQuestions: number;
  questions: IQuestion[];
}
