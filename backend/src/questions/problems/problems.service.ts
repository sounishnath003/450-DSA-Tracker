import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SolutionRepository } from 'src/solution/solution.repository';
import { Solution, SolutionDocument } from 'src/solution/solution.schema';
import { CreateProblemDto } from './dto/create-problem.dto';
import { ProblemsRepository } from './problems.repository';

@Injectable()
export class ProblemsService {
  constructor(
    private problemRepo: ProblemsRepository,
    @InjectModel(Solution.name) private solutionSchema: Model<SolutionDocument>,
    private solutionRepo: SolutionRepository,
  ) {}

  async createProblem(createProblemDto: CreateProblemDto) {
    try {
      await this.problemRepo.create(createProblemDto);
      return { data: `New Problem Has Been Created!` };
    } catch (error) {
      return error;
    }
  }

  async getInformation(userid: string, problemId: string) {
    return {
      data: await this.solutionRepo.getCompleteInformationOfTheProblem(
        userid,
        problemId,
      ),
    };
  }
}
