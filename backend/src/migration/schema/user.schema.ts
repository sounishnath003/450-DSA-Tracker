import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema({ collection: 'users' })
export class BUser {
  @Prop({
    type: SchemaTypes.String,
  })
  username: string;

  @Prop({
    type: SchemaTypes.String,
  })
  password: string;
}

export type BUserDocument = BUser & Document;
export const BUserSchema = SchemaFactory.createForClass(BUser);
