import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { Problem, ProblemSchema } from './problems/problem.schema';
import { ProblemsController } from './problems/problems.controller';
import { ProblemsRepository } from './problems/problems.repository';
import { ProblemsService } from './problems/problems.service';
import { QuestionRepository } from './question.repository';
import { Question, QuestionSchema } from './question.schema';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Question.name, schema: QuestionSchema, collection: 'questions' },
      { name: Problem.name, schema: ProblemSchema, collection: 'problems' },
    ]),
  ],
  controllers: [QuestionsController, ProblemsController],
  providers: [
    QuestionsService,
    QuestionRepository,
    ProblemsService,
    ProblemsRepository,
  ],
})
export class QuestionsModule {}
