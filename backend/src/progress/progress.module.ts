import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Question } from 'src/questions/question.schema';
import { Solution, SolutionSchema } from 'src/solution/solution.schema';
import { ProgressController } from './progress.controller';
import { ProgressService } from './progress.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Solution.name,
          schema: SolutionSchema,
          collection: 'solutions',
        },
        { name: Question.name, schema: Question, collection: 'questions' },
      ],
      'PROD',
    ),
  ],
  controllers: [ProgressController],
  providers: [ProgressService],
})
export class ProgressModule {}
