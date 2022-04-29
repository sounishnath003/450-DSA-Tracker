import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UUIDV4 } from 'src/shared/utility.methods';
import { CreateProblemDto } from './dto/create-problem.dto';
import { Problem, ProblemDocument } from './problem.schema';

@Injectable()
export class ProblemsRepository {
  constructor(
    @InjectModel(Problem.name) private problemSchema: Model<ProblemDocument>,
  ) {}

  async findByTopicname(topicname: string) {
    return await this.problemSchema.find({ topicname }, { _id: 0, __v: 0 });
  }

  async findAll() {
    return await this.problemSchema.find({}, { _id: 0, __v: 0 });
  }

  async create(createProblemDto: CreateProblemDto) {
    const problem = new this.problemSchema({
      ...createProblemDto,
      id: UUIDV4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return await problem.save();
  }
}
