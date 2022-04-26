import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Base } from 'src/shared/base.schema';

@Schema({ collection: 'users' })
export class User extends Base {
  @Prop({
    unique: true,
    minlength: 6,
    required: true,
    index: 'hashed',
    lowercase: true,
  })
  username: string;

  @Prop({ unique: true, minlength: 6, required: true })
  password: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
