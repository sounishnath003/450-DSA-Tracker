import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { UUIDV4 } from 'src/shared/utility.methods';
import { CreateSolutionDto } from './dto/create-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';
import { Solution, SolutionDocument } from './solution.schema';

@Injectable({})
export class SolutionRepository {
  constructor(
    @InjectModel(Solution.name) private solutionSchema: Model<SolutionDocument>,
  ) {}

  async update(
    userId: string,
    solutionId: string,
    updateSolutionDto: UpdateSolutionDto,
  ) {
    const solution = await this.solutionSchema.findOne({
      id: solutionId,
      userId,
    });
    solution.code = updateSolutionDto.code;
    solution.updatedAt = new Date();

    return await solution.save();
  }

  async create(userId: string, createSolutionDto: CreateSolutionDto) {
    const solution = new this.solutionSchema({
      ...createSolutionDto,
      userId,
      id: UUIDV4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await solution.save();
  }

  async insertBulk(datas: Array<Partial<SolutionDocument>>, counter: number) {
    const updatedSolutions = datas.map((data) => {
      return {
        code: '// Upload your working solution!',
        ...data,
        id: UUIDV4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });
    await this.solutionSchema.insertMany(updatedSolutions);
    console.log({ user: counter });
    return true;
  }

  async findAll() {
    return await this.solutionSchema.find({});
  }

  async getCompleteInformationOfTheProblem(userid: string, problemId: string) {
    return (
      await this.solutionSchema.aggregate([
        { $match: { userId: userid, problemId } },
        {
          $lookup: {
            localField: 'problemId',
            from: 'problems',
            foreignField: 'id',
            as: 'problemInformation',
            pipeline: [
              {
                $project: {
                  _id: 0,
                  __v: 0,
                },
              },
            ],
          },
        },
        {
          $project: {
            _id: 0,
            __v: 0,
          },
        },
      ])
    ).map((data) => {
      return { ...data, problemInformation: data.problemInformation[0] };
    });
  }

  async resetProgressByQuestionTopicId(userId: string, questionId: string) {
    const userSolutions = await this.solutionSchema.deleteMany({
      userId,
      questionId,
    } as FilterQuery<{
      userId;
      questionId;
    }>);
    return userSolutions;
  }
}
