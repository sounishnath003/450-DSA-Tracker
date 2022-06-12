import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Base } from 'src/shared/base.schema';

export enum DifficultyTypeEnum {
  'Easy',
  'Medium',
  'Hard',
}

@Schema({ collection: 'problems' })
export class Problem extends Base {
  @Prop({ type: SchemaTypes.String, required: true })
  problemTitle: string;

  @Prop({ type: SchemaTypes.String, required: true })
  problemURL: string;

  @Prop({ type: SchemaTypes.String, index: true, ref: 'Question' })
  topicname: string;

  @Prop({ type: SchemaTypes.String, default: DifficultyTypeEnum.Medium })
  difficultyLevel: DifficultyTypeEnum;

  @Prop({ type: SchemaTypes.String, default: '' })
  questionInformation: string;

  @Prop({ type: SchemaTypes.Number, default: 0 })
  upvoted: number;

  @Prop({ type: SchemaTypes.Number, default: 0 })
  downvoted: number;
}

export type ProblemDocument = Problem & Document;
export const ProblemSchema = SchemaFactory.createForClass(Problem);
