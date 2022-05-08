import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Base } from 'src/shared/base.schema';

@Schema({ collection: 'solutions' })
export class Solution extends Base {
  @Prop({ type: SchemaTypes.String, required: true, index: true })
  userId: string;

  @Prop({ type: SchemaTypes.String, required: true })
  questionId: string;

  @Prop({ type: SchemaTypes.String, required: true, unique: false })
  problemId: string;

  @Prop({
    type: SchemaTypes.String,
    // required: true,
    default: '// Upload your working solution!',
  })
  code: string;
}

export type SolutionDocument = Solution & Document;
export const SolutionSchema = SchemaFactory.createForClass(Solution);
