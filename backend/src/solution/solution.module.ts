import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Question, QuestionSchema } from 'src/questions/question.schema';
import { SolutionController } from './solution.controller';
import { SolutionRepository } from './solution.repository';
import { Solution, SolutionSchema } from './solution.schema';
import { SolutionService } from './solution.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Solution.name,
          schema: SolutionSchema,
          collection: 'solutions',
        },
        {
          name: Question.name,
          schema: QuestionSchema,
          collection: 'questions',
        },
      ],
      'PROD',
    ),
  ],
  controllers: [SolutionController],
  providers: [SolutionService, SolutionRepository],
  exports: [SolutionService, SolutionRepository],
})
export class SolutionModule {}
