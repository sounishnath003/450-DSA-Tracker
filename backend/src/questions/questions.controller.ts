import {
    Body,
    Controller,
    Delete,
    Get,
    Patch,
    Post,
    Query,
    UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionsService } from './questions.service';

@Controller('questions')
@UseGuards(AuthGuard('jwt'))
export class QuestionsController {
  constructor(private readonly questionService: QuestionsService) {}

  @Get('')
  async getQuestions(@Query('topicname') topicname: string = '') {
    // this method will return user's questionlist combined with solution tbl
    return await this.questionService.getAll(topicname);
  }

  @Post('create')
  async createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    return await this.questionService.createQuestion(createQuestionDto);
  }

  @Patch('update')
  async updateQuestion(
    @Query('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return await this.questionService.updateQuestion(id, updateQuestionDto);
  }

  @Delete('delete')
  async deleteQuestion(@Query('id') id: string) {
    return await this.questionService.deleteQuestion(id);
  }
}
