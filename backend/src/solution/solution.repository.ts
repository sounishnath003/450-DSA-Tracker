import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UUIDV4 } from 'src/shared/utility.methods';
import { CreateSolutionDto } from './dto/create-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';
import { Solution, SolutionDocument } from './solution.schema';

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
    console.log(solution);

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

  async findAll() {
    return await this.solutionSchema.find({});
  }
}
