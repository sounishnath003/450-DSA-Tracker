import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepository } from 'src/auth/user.repository';
import { ProblemsRepository } from 'src/questions/problems/problems.repository';
import { QuestionRepository } from 'src/questions/question.repository';
import { QuestionData } from '../data';
import { BUser, BUserDocument } from '../schema/user.schema';

@Injectable()
export class MigrateService {
  constructor(
    @InjectModel(BUser.name) private buserschema: Model<BUserDocument>,
    private userRepo: UserRepository,
    private questionRepo: QuestionRepository,
    private problemRepo: ProblemsRepository,
  ) {
    (async () => {
      try {
        // // ============= User Migrations =============
        // const originalUsers = await this.getAllUsers();
        // const whenCompleted = await this.userRepo.insertBulk(originalUsers);
        // console.log({ whenCompleted });
        // // ============= DONE =============
        // // ============= Topicwise ~ Questions Migrations =============
        // const questions = this.getAllTopicNames();
        // const questionCompletion = await this.questionRepo.insertBulk(
        //   questions,
        // );
        // console.log({ questionCompletion });
        // // ============= DONE =============
        // // ============= Topicwise ~ Problem Migrations =============
        // const problems = this.getAllProblemsByTopicnames();
        // const problemCompletion = await this.problemRepo.insertBulk(problems);
        // console.log({ problemCompletion });
        // // ============= DONE =============
        // // ============= Solution Migrations =============
      } catch (error) {
        throw new Error(error);
      }
    })();
  }

  async getAllUsers() {
    return (await this.buserschema.find({}, { _id: 0, __v: 0 })).map((user) =>
      user.toJSON(),
    );
  }

  getAllTopicNames() {
    return QuestionData.map((questionData) => {
      return { topicname: questionData.topicName };
    });
  }

  getAllProblemsByTopicnames() {
    const results = [];
    QuestionData.map((questionData) => {
      const problems = questionData.questions.map((problem) => {
        return {
          problemTitle: problem.Problem,
          problemURL: problem.URL,
          topicname: questionData.topicName,
        };
      });
      results.push(...problems);
    });
    return results;
  }
}
