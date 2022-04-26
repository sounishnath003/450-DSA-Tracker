import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({})
export class Base {
  @Prop()
  id: string;
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
}

export type BaseDocument = Base & Document;
export const BaseSchema = SchemaFactory.createForClass(Base);