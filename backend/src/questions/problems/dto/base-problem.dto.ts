import { IsNotEmpty, IsString } from 'class-validator';
import { Base } from 'src/shared/base.schema';

export class BaseProblemDto extends Base {
  @IsNotEmpty()
  @IsString()
  problemTitle: string;

  @IsNotEmpty()
  @IsString()
  problemURL: string;

  @IsNotEmpty()
  @IsString()
  topicname: string;

  @IsString()
  questionInformation: string = '';
}
