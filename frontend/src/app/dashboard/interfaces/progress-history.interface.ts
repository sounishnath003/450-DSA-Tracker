export interface ProgressHistoryInterface {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  topicname: string;
  totalProblems: number;
  solveCount: number;
  started: boolean;
  completionPercentage: string;
}
