import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { QuestionInterface } from '../data';

@Schema({ collection: 'alltopicquestions' })
export class BAllTopicQuestion {
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'users',
  })
  userId: string;

  @Prop({
    type: SchemaTypes.Array,
  })
  questions: Array<QuestionInterface>;
}

export type BAllTopicQuestionDocument = BAllTopicQuestion & Document;
export const BAllTopicQuestionSchema =
  SchemaFactory.createForClass(BAllTopicQuestion);
