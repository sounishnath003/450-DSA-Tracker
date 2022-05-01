import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionRepository } from './question.repository';

@Injectable()
export class QuestionsService {
  constructor(private readonly questionRepo: QuestionRepository) {}

  async getAll(userId: string, topicname: string) {
    try {
      if (!topicname) {
        // return all
        const questions = await this.questionRepo.findAll();
        return { data: { questions } };
      } else {
        // return by topicname only
        const questions = await this.questionRepo.findByTopicname(
          userId,
          topicname,
        );
        return { data: { questions } };
      }
    } catch (error) {
      return error;
    }
  }

  async createQuestion(createQuestionDto: CreateQuestionDto) {
    try {
      const { topicname, topicInformation } = createQuestionDto;
      const question = this.questionRepo.create({
        topicname,
        topicInformation,
      });
      await question.save();

      return {
        data: `New Topic ${topicname} Has Added In The Questions Category!`,
      };
    } catch (error) {
      if (error.code === 11000)
        return new NotAcceptableException('Topic has been already created!');
      return error;
    }
  }

  async updateQuestion(id: string, updateQuestion: UpdateQuestionDto) {
    try {
      const { topicname, topicInformation } = updateQuestion;
      await this.questionRepo.findByIdAndUpdate(
        id,
        topicname,
        topicInformation,
      );

      return { data: `Topic Has Been Updated!.` };
    } catch (error) {
      if (error.code === 11000)
        return new NotAcceptableException('Topic has been already created!');
      return error;
    }
  }

  async deleteQuestion(id: string) {
    try {
      await this.questionRepo.delete(id);
      return { data: `Topic ${id} has been deleted!.` };
    } catch (error) {
      return error;
    }
  }
}
