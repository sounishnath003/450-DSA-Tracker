import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { generateUUIDV4 } from './utility-methods';

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
      id: generateUUIDV4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async findOne(userFilter: FilterQuery<UserDocument>) {
    return await this.userSchema.findOne({ ...userFilter });
  }
}
