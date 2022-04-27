import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema()
export class Base {
  @Prop({
    type: SchemaTypes.String,
    index: 'hashed',
    required: true,
    unique: true,
  })
  id: string;

  @Prop({ type: SchemaTypes.Date })
  createdAt: Date;

  @Prop({ type: SchemaTypes.Date })
  updatedAt: Date;
}

export type BaseDocument = Base & Document;
export const BaseSchema = SchemaFactory.createForClass(Base);
