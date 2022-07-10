import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { UserRepository } from 'src/auth/user.repository';
import { ProblemsRepository } from 'src/questions/problems/problems.repository';
import { QuestionRepository } from 'src/questions/question.repository';
import { SolutionRepository } from 'src/solution/solution.repository';
import {
  QuestionData,
  QuestionInterface,
  QuestionMigrationDataInterface,
} from '../data';
import {
  BAllTopicQuestion,
  BAllTopicQuestionDocument,
} from '../schema/alltopicquestions.schema';
import { BUser, BUserDocument } from '../schema/user.schema';

@Injectable()
export class MigrateService {
  constructor(
    @InjectModel(BUser.name) private buserSchema: Model<BUserDocument>,
    @InjectModel(BAllTopicQuestion.name)
    private ballTopicSchema: Model<BAllTopicQuestionDocument>,
    private userRepo: UserRepository,
    private questionRepo: QuestionRepository,
    private problemRepo: ProblemsRepository,
    private solutionRepo: SolutionRepository,
  ) {
    (async () => {
      try {
        // await this.FromOldProductionToNewProductionDatabaseMigration();
        // await this.problemRepo.updateTopicnameForStrings();
      } catch (error) {
        throw new Error(error);
      }
    })();
  }

  private async FromOldProductionToNewProductionDatabaseMigration() {
    // ============= User Migrations =============
    const originalUsers = await this.getAllUsers();
    const whenCompleted = await this.userRepo.insertBulk(originalUsers);
    console.log('users migration done...', whenCompleted);
    // ============= DONE =============
    // ============= Topicwise ~ Questions Migrations =============
    const questions = this.getAllTopicNames();
    const questionCompletion = await this.questionRepo.insertBulk(questions);
    console.log('questions migration done...', questionCompletion);
    // ============= DONE =============
    // ============= Topicwise ~ Problem Migrations =============
    const problems = this.getAllProblemsByTopicnames();
    const problemCompletion = await this.problemRepo.insertBulk(problems);
    console.log('problems migration done...', problemCompletion);
    // ============= DONE =============
    // ============= Solution Migrations =============
    const whenSolutionDone = await this.createSolutionsByAllUser();
    console.log('whenSolutions migration done...', whenSolutionDone);
  }

  async createSolutionsByAllUser() {
    let counter = 0;
    const usersMap = await this.getAllUsersMap({ __v: 0, password: 0 });
    const startTime: number = Date.now();
    const userAndQuestions = (
      await this.ballTopicSchema.find(
        {
          // userId: '60dda9e4e9bf7f001f0b85e6',
        },
        { __v: 0, _id: 0 },
      )
    ).map(async (question: any) => {
      const usernameWithQuestions = {
        topicname: question.questions,
        questions: question.questions,
        username: usersMap.get(question.userId.toString()),
      };
      const username = usernameWithQuestions.username;
      await usernameWithQuestions.questions.map(
        async (question: QuestionMigrationDataInterface) => {
          const data = await this.prepareData(
            question.questions,
            question.topicName,
            username,
          );

          if (data !== undefined && data.length) {
            await this.solutionRepo.insertBulk(data, ++counter);
          }
        },
      );
    });
    return {
      status: 'Successfully Done!',
      completedIn: `${Date.now() - startTime} ms`,
    };
  }

  async prepareData(
    questions: Array<QuestionInterface>,
    topicname: string,
    username: string,
  ) {
    try {
      const data = [];
      for (const question of questions) {
        if (question.Done) {
          data.push({
            userId: (await this.userRepo.findOne({ username })).id,
            questionId: (await this.questionRepo.findOne({ topicname })).id,
            problemId: (
              await this.problemRepo.findOne({
                topicname,
                problemTitle: question.Problem,
              })
            ).id,
            code: question['code'] ?? '// Upload your working solution!',
          });
        }
      }

      return data;
    } catch (error) {
      console.log('[ERROR]:', username, topicname);
    }
  }

  async getAllUsers() {
    return (await this.buserSchema.find({}, { _id: 0, __v: 0 })).map((user) =>
      user.toJSON(),
    );
  }

  async getAllUsersMap(fields: FilterQuery<BUser>) {
    const users = (await this.buserSchema.find({}, fields)).map((user) =>
      user.toJSON(),
    );
    const usersMap = new Map<string, string>();
    users.map((user) => {
      usersMap.set(user._id.toString(), user.username);
    });
    return usersMap;
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
