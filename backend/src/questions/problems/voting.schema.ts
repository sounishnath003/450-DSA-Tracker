import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Base } from 'src/shared/base.schema';

export type VOTETYPE = 'UP' | 'DOWN';

@Schema({ collection: 'votes' })
export class Vote extends Base {
  @Prop({ type: SchemaTypes.String, ref: 'problems' })
  problemId: string;

  @Prop({ type: SchemaTypes.String, ref: 'users' })
  userId: string;

  @Prop({ type: SchemaTypes.String })
  voteType: VOTETYPE;
}

export type VoteDocument = Document & Vote;
export const VoteSchema = SchemaFactory.createForClass(Vote);
