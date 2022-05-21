import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
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

  @Get('details')
  async getCompleteInformationForTheProblemId(
    @GetUser() user: any,
    @Query('problemId') problemId: string,
  ) {
    return await this.problemService.getInformation(user.id, problemId);
  }
}
