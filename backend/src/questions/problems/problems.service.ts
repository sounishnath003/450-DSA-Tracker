import { Injectable } from '@nestjs/common';
import { CreateProblemDto } from './dto/create-problem.dto';
import { ProblemsRepository } from './problems.repository';

@Injectable()
export class ProblemsService {
  constructor(private problemRepo: ProblemsRepository) {}

  async createProblem(createProblemDto: CreateProblemDto) {
    try {
      await this.problemRepo.create(createProblemDto);
      return { data: `New Problem Has Been Created!` };
    } catch (error) {
      return error;
    }
  }
}
