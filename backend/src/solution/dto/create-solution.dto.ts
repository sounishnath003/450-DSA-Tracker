import { IsNotEmpty, IsUUID } from 'class-validator';
import { BaseSolutionDto } from './base-solution.dto';

export class CreateSolutionDto extends BaseSolutionDto {
  @IsNotEmpty()
  @IsUUID()
  questionId: string;

  @IsNotEmpty()
  @IsUUID()
  problemId: string;
}
