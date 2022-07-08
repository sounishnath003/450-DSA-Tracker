import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { CreateProblemDto } from './dto/create-problem.dto';
import { updateProblemDto } from './dto/update-problem.dto';
import { ProblemsService } from './problems.service';
import { VOTETYPE } from './voting.schema';

@UseGuards(AuthGuard('jwt'))
@Controller('questions/problems')
export class ProblemsController {
  constructor(private problemService: ProblemsService) {}

  @Post('create')
  async createProblem(@Body() createProblemDto: CreateProblemDto) {
    return await this.problemService.createProblem(createProblemDto);
  }

  @Patch('update')
  async updateProblem(
    @GetUser() user: any,
    @Query('problemId') problemId: string,
    @Body() updateParams: updateProblemDto,
  ) {
    return await this.problemService.updateProblem(
      user.id,
      problemId,
      updateParams,
    );
  }

  @Get('details')
  async getCompleteInformationForTheProblemId(
    @GetUser() user: any,
    @Query('problemId') problemId: string,
  ) {
    return await this.problemService.getInformation(user.id, problemId);
  }

  @Post('vote-for')
  async updateVote(
    @GetUser() user: any,
    @Query('problemId') problemId: string,
    @Query('voteType') voteType: VOTETYPE,
  ) {
    return await this.problemService.updateVote(user, problemId, voteType);
  }
}
