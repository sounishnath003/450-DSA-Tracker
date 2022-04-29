import { IsNotEmpty, IsString } from 'class-validator';

export class BaseProblemDto {
  @IsNotEmpty()
  @IsString()
  problemTitle: string;

  @IsNotEmpty()
  @IsString()
  problemURL: string;

  @IsNotEmpty()
  @IsString()
  topicname: string;
}
