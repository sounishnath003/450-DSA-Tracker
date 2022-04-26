import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './dto/user.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private userSchema: Model<UserDocument>,
  ) {}

  async getAllUsers() {
    return await this.userSchema.find();
  }
}
