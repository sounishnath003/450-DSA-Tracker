import { IsString } from 'class-validator';

export class BaseSolutionDto {
  @IsString()
  code: string = '// Upload your working solution!';
}
