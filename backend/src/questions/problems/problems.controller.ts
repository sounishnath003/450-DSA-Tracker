import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateProblemDto } from './dto/create-problem.dto';
import { ProblemsService } from './problems.service';

@UseGuards(AuthGuard('jwt'))
@Controller('questions/problems')
export class ProblemsController {
  constructor(private problemService: ProblemsService) {}

  @Post('create')
  async createProblem(@Body() createProblemDto: CreateProblemDto) {
    return await this.problemService.createProblem(createProblemDto);
  }
}
