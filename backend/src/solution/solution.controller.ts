import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { CreateSolutionDto } from './dto/create-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';
import { SolutionService } from './solution.service';

@UseGuards(AuthGuard('jwt'))
@Controller('solutions')
export class SolutionController {
  constructor(private readonly solutionService: SolutionService) {}

  @Post('submit')
  async submit(
    @GetUser() user: any,
    @Body() createSolutionDto: CreateSolutionDto,
  ) {
    // return await this.solutionService.findAll();
    return await this.solutionService.submit(user.id, createSolutionDto);
  }

  @Patch('update')
  async update(
    @GetUser() user: any,
    @Query('solutionId') solutionId: string,
    @Body() updateSolutionDto: UpdateSolutionDto,
  ) {
    return await this.solutionService.update(
      user.id,
      solutionId,
      updateSolutionDto,
    );
  }

  @Delete('reset-progress')
  async resetProgressForQuestionTopic(@GetUser() user: any, @Query('questionId') questionId: string) {
    return await this.solutionService.resetProgressByQuestionTopicId(user.id, questionId);
  }
}
