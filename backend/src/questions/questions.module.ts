import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { User, UserSchema } from 'src/auth/user.schema';
import { SolutionModule } from 'src/solution/solution.module';
import { Solution, SolutionSchema } from 'src/solution/solution.schema';
import { Problem, ProblemSchema } from './problems/problem.schema';
import { ProblemsController } from './problems/problems.controller';
import { ProblemsRepository } from './problems/problems.repository';
import { ProblemsService } from './problems/problems.service';
import { Vote, VoteSchema } from './problems/voting.schema';
import { QuestionRepository } from './question.repository';
import { Question, QuestionSchema } from './question.schema';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature(
      [
        {
          name: Question.name,
          schema: QuestionSchema,
          collection: 'questions',
        },
        { name: Problem.name, schema: ProblemSchema, collection: 'problems' },
        { name: Vote.name, schema: VoteSchema, collection: 'votes' },
        {
          name: Solution.name,
          schema: SolutionSchema,
          collection: 'solutions',
        },
        { name: User.name, schema: UserSchema, collection: 'users' },
      ],
      'PROD',
    ),
    SolutionModule,
  ],
  controllers: [QuestionsController, ProblemsController],
  providers: [
    QuestionsService,
    QuestionRepository,
    ProblemsService,
    ProblemsRepository,
  ],
  exports: [QuestionRepository, ProblemsRepository],
})
export class QuestionsModule {}
