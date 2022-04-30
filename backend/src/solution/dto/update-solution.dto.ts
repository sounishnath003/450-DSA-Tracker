import { IsNotEmpty, IsString } from 'class-validator';
import { BaseSolutionDto } from './base-solution.dto';

export class UpdateSolutionDto extends BaseSolutionDto {
  @IsNotEmpty()
  @IsString()
  code: string;
}
