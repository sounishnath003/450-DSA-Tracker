import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Base } from 'src/shared/base.schema';

@Schema({ collection: 'progress' })
export class Progress extends Base {}

export type ProgressDocument = Progress & Document;
export const ProgressSchema = SchemaFactory.createForClass(Progress);
