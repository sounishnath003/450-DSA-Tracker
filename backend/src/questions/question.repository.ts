import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User, UserDocument } from 'src/auth/user.schema';
import { UUIDV4 } from 'src/shared/utility.methods';
import { Solution, SolutionDocument } from 'src/solution/solution.schema';
import { Problem, ProblemDocument } from './problems/problem.schema';
import { Question, QuestionDocument } from './question.schema';

@Injectable()
export class QuestionRepository {
  constructor(
    @InjectModel(Question.name) private questionSchema: Model<QuestionDocument>,
    @InjectModel(Problem.name) private problemSchema: Model<ProblemDocument>,
    @InjectModel(Solution.name) private solutionSchema: Model<SolutionDocument>,
    @InjectModel(User.name) private userSchema: Model<UserDocument>,
  ) {}

  async findByTopicname(userId: string, topicname: string) {
    const question = await this.questionSchema.findOne(
      { topicname },
      {
        id: 1,
        topicname: 1,
        topicInformation: 1,
      },
    );

    const _solvedProblems = (
      await this.userSchema.aggregate([
        {
          $match: { id: userId },
        },
        {
          $lookup: {
            from: 'solutions',
            localField: 'id',
            foreignField: 'userId',
            as: 'solvedQuestions',
            pipeline: [
              {
                $lookup: {
                  from: 'problems',
                  localField: 'problemId',
                  foreignField: 'id',
                  as: 'problemInformation',
                },
              },
              {
                $project: {
                  'solvedQuestions.__v': 0,
                  'solvedQuestions._id': 0,
                  'problems._id': 0,
                  'problems.__v': 0,
                  'problemInformation.__v': 0,
                  'problemInformation._id': 0,
                },
              },
            ],
          },
        },
        {
          $project: {
            __v: 0,
            _id: 0,
            'solvedQuestions.__v': 0,
            'solvedQuestions._id': 0,
            'problems._id': 0,
            'problems.__v': 0,
            'problemInformation.__v': 0,
            'problemInformation._id': 0,
            password: 0,
          },
        },
      ])
    )[0];

    const solutionProblemIds = (
      await this.solutionSchema.find({ userId }, { problemId: 1 })
    ).map((soln) => soln.problemId);
    const problems = await this.problemSchema.find(
      {
        topicname: topicname,
        id: { $nin: [...solutionProblemIds] },
      },
      { _id: 0, __v: 0 },
    );

    const attemptedCountMap = await this.getAttemptedUserCountMapByTopicname(
      topicname,
    );

    const solvedProblems = this.getTotalSolvedProblems(
      _solvedProblems,
      topicname,
      attemptedCountMap,
    );

    return {
      topicname,
      topicInformation: question.topicInformation,
      problems: problems.map((problem) => {
        return {
          ...problem.toJSON(),
          questionId: question.id,
          attemptedCount: attemptedCountMap.get(problem.id) || 0,
        };
      }),
      solvedProblems,
    };
  }

  private getTotalSolvedProblems(
    _solvedProblems: any,
    topicname: string,
    attemptedCountMap: Map<string, number>,
  ) {
    const solvedProblems = [];
    _solvedProblems.solvedQuestions.map((solution: any) => {
      if (solution.problemInformation[0].topicname === topicname) {
        solvedProblems.push({
          ...solution,
          problemInformation: {
            ...solution.problemInformation[0],
            attemptedCount: attemptedCountMap.get(solution.problemId) || 0,
          },
        });
      }
    });
    return solvedProblems;
  }

  private async getAttemptedUserCountMapByTopicname(topicname: string) {
    // we need to find the how many users have solved the problem as attemptedCount
    const problems = await this.problemSchema.find(
      { topicname },
      { _id: 0, __v: 0 },
    );
    const data = await this.solutionSchema.aggregate([
      {
        $match: { problemId: { $in: problems.map((problem) => problem.id) } },
      },
      {
        $group: {
          _id: '$problemId',
          count: { $sum: 1 },
        },
      },
    ]);
    const map = new Map<string, number>();
    data.forEach((element) => {
      map.set(element._id, element.count);
    });
    return map;
  }

  async findAll() {
    return await this.questionSchema
      .find({}, { _id: 0, __v: 0 })
      .populate(['problems']);
  }

  async findOne(query: FilterQuery<QuestionDocument>) {
    return await this.questionSchema.findOne(query, { __v: 0, _id: 0 });
  }

  create(questionCreate: Partial<QuestionDocument>) {
    return new this.questionSchema({
      ...questionCreate,
      id: UUIDV4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async insertBulk(questions: Array<Partial<QuestionDocument>>) {
    const updatedQuestions = questions.map((question) => {
      return {
        ...question,
        topicInformation: `Curated Lists of Polular ${question.topicname} Questions`,
        id: UUIDV4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    const startTime = Date.now();
    await this.questionSchema.insertMany(updatedQuestions);
    return {
      status: 'Successfully Done!',
      completedIn: `${Date.now() - startTime} ms`,
    };
  }

  async findByIdAndUpdate(
    id: string,
    topicname: string,
    topicInformation: string,
  ) {
    const updatedQuestion = await this.questionSchema.findOne({ id });
    updatedQuestion.topicname = topicname;
    updatedQuestion.topicInformation = topicInformation;
    updatedQuestion.updatedAt = new Date();
    await updatedQuestion.save();
  }

  async delete(id: string) {
    await this.questionSchema.findOneAndDelete({ id });
  }
}
