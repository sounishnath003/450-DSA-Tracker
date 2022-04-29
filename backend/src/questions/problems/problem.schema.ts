import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Base } from 'src/shared/base.schema';

@Schema({ collection: 'problems' })
export class Problem extends Base {
  @Prop({ type: SchemaTypes.String, required: true })
  problemTitle: string;

  @Prop({ type: SchemaTypes.String, required: true })
  problemURL: string;

  @Prop({ type: SchemaTypes.String, index: true, ref: 'Question' })
  topicname: string;
}

export type ProblemDocument = Problem & Document;
export const ProblemSchema = SchemaFactory.createForClass(Problem);
