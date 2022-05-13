export interface ProgressHistoryInterface {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  topicname: string;
  totalProblems: number;
  totalSubscribers: number;
  solveCount: number;
  started: boolean;
  completionPercentage: string;
}
