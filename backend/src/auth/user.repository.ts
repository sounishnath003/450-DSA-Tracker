import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { UUIDV4 } from 'src/shared/utility.methods';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private userSchema: Model<UserDocument>,
  ) {}

  async getAllUsers() {
    return await this.userSchema.find();
  }

  async createUser(userInfo: { username: string; password: string }) {
    return new this.userSchema({
      ...userInfo,
      id: UUIDV4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async findOne(userFilter: FilterQuery<UserDocument>) {
    return await this.userSchema.findOne({ ...userFilter });
  }
}
