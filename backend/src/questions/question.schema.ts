import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Base } from 'src/shared/base.schema';

@Schema({ collection: 'questions' })
export class Question extends Base {
  @Prop({ type: SchemaTypes.String, required: true, unique: true })
  topicname: string;

  @Prop({
    type: SchemaTypes.String,
    default: 'Curated lists of popular questions',
    maxlength: 700,
  })
  topicInformation: string;
}

export type QuestionDocument = Question & Document;
export const QuestionSchema = SchemaFactory.createForClass(Question);
