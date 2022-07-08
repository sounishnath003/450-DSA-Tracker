import { IsNotEmpty, IsString } from 'class-validator';
import { Base } from 'src/shared/base.schema';

export class BaseQuestionDto extends Base {
  @IsNotEmpty()
  @IsString()
  topicname: string;

  topicInformation: string;
}
