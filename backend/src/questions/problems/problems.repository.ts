import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { UUIDV4 } from 'src/shared/utility.methods';
import { Question, QuestionDocument } from '../question.schema';
import { CreateProblemDto } from './dto/create-problem.dto';
import { Problem, ProblemDocument } from './problem.schema';

@Injectable()
export class ProblemsRepository {
  constructor(
    @InjectModel(Problem.name) private problemSchema: Model<ProblemDocument>,
    @InjectModel(Question.name) private questionSchema: Model<QuestionDocument>,
  ) {}

  async findByTopicname(topicname: string) {
    return await this.problemSchema.find({ topicname }, { _id: 0, __v: 0 });
  }

  async findAll() {
    return await this.problemSchema.find({}, { _id: 0, __v: 0 });
  }

  async findOne(query: FilterQuery<ProblemDocument>) {
    return await this.problemSchema.findOne(query, { _id: 0, __v: 0 });
  }

  async create(createProblemDto: CreateProblemDto) {
    const problem = new this.problemSchema({
      ...createProblemDto,
      id: UUIDV4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await problem.save();
    const question = await this.questionSchema.findOne({
      topicname: createProblemDto.topicname,
    });
    question.problems.push(problem._id);
    question.totalProblems += 1;
    await question.save();
    return true;
  }

  async insertBulk(problems: Array<CreateProblemDto>) {
    const startTime = Date.now();
    for (const problemInfo of problems) {
      await this.create(problemInfo);
    }
    return {
      status: 'Successfully Done!',
      completedIn: `${Date.now() - startTime} ms.`,
    };
  }
}
