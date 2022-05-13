import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question, QuestionDocument } from 'src/questions/question.schema';
import { Solution, SolutionDocument } from 'src/solution/solution.schema';

@Injectable()
export class ProgressService {
  constructor(
    @InjectModel(Solution.name) private solutionSchema: Model<SolutionDocument>,
    @InjectModel(Question.name) private questionSchema: Model<QuestionDocument>,
  ) {}

  async progress(userId: any) {
    const solvedQuestions = (
      await this.solutionSchema.aggregate([
        { $match: { userId } },
        {
          $group: {
            _id: { questionId: '$questionId' },
            count: { $sum: 1 },
          },
        },
      ])
    ).map((solve) => {
      return {
        questionId: solve._id.questionId,
        solveCount: solve.count,
      };
    });

    const questions = await this.questionSchema.find(
      {},
      { _id: 0, __v: 0, problems: 0, topicInformation: 0 },
    );
    let questionsMap = new Map<string, number>();
    solvedQuestions.map((solq) =>
      questionsMap.set(solq.questionId, solq.solveCount),
    );

    const subscriberCountMap = await this.totalSubscribersToAllQuestionsMap();

    const progressHistory = questions.map((question) => {
      const solveCount = questionsMap.get(question.id) ?? 0;
      return {
        ...question.toJSON(),
        totalSubscribers: subscriberCountMap.get(question.id) ?? 0,
        solveCount,
        started: solveCount === 0 ? false : true,
        completionPercentage: (
          (solveCount / question.totalProblems) *
          100
        ).toFixed(2),
      };
    });

    return { data: { progressHistory } };
  }

  private async totalSubscribersToAllQuestionsMap() {
    // How many user has solved each question
    const data = (
      await this.solutionSchema.aggregate([
        { $group: { _id: { questionId: '$questionId' }, count: { $sum: 1 } } },
      ])
    ).map((solve) => {
      return {
        questionId: solve._id.questionId,
        solveCount: solve.count,
      };
    });
    const map = new Map<string, number>();
    data.map((solq) => map.set(solq.questionId, solq.solveCount));
    return map;
  }
}
