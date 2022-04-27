import { IsNotEmpty, IsString } from 'class-validator';

export class BaseQuestionDto {
  @IsNotEmpty()
  @IsString()
  topicname: string;

  topicInformation: string;
}
