import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
    const solvedProblems = await this.userSchema.aggregate([
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
    ]);

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

    return {
      problems,
      solvedProblems: [
        ...solvedProblems.map((solvedproblem) => solvedproblem.solvedQuestions),
      ][0],
    };
  }

  async findAll() {
    return await this.questionSchema
      .find({}, { _id: 0, __v: 0 })
      .populate(['problems']);
  }

  create(questionCreate: Partial<QuestionDocument>) {
    return new this.questionSchema({
      ...questionCreate,
      id: UUIDV4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
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
