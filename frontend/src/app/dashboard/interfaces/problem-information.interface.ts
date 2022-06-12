export interface ProblemInformationInterface {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  questionId: string;
  problemId: string;
  code: string;
  problemInformation: ProblemInformation;
}

export interface ProblemInformation {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  problemTitle: string;
  problemURL: string;
  topicname: string;
  difficultyLevel: string;
  questionInformation: string;
  upvoted: number;
  downvoted: number;
}
