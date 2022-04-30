import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UUIDV4 } from 'src/shared/utility.methods';
import { Question, QuestionDocument } from './question.schema';

@Injectable()
export class QuestionRepository {
  constructor(
    @InjectModel(Question.name) private questionSchema: Model<QuestionDocument>,
  ) {}

  async findByTopicname(topicname: string) {
    return await this.questionSchema
      .find({ topicname }, { _id: 0, __v: 0 })
      .populate(['problems']);
  }

  async findAll() {
    return await this.questionSchema
      .find({}, { _id: 0, __v: 0 })
      .populate(['problems']);
  }

  create(questionCreate: Partial<QuestionDocument>) {
    return new this.questionSchema({
      ...questionCreate,
      id: UUIDV4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async findByIdAndUpdate(
    id: string,
    topicname: string,
    topicInformation: string,
  ) {
    const updatedQuestion = await this.questionSchema.findOne({ id });
    updatedQuestion.topicname = topicname;
    updatedQuestion.topicInformation = topicInformation;
    updatedQuestion.updatedAt = new Date();
    await updatedQuestion.save();
  }

  async delete(id: string) {
    await this.questionSchema.findOneAndDelete({ id });
  }
}
