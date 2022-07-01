import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateSolutionDto } from './dto/create-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';
import { SolutionRepository } from './solution.repository';

@Injectable()
export class SolutionService {
  constructor(private readonly solutionRepository: SolutionRepository) {}

  async submit(userId: any, createSolutionDto: CreateSolutionDto) {
    try {
      await this.solutionRepository.create(userId, createSolutionDto);
      return { data: `Your Solution Has Been Saved!.` };
    } catch (error) {
      if (error.code === 11000)
        throw new NotAcceptableException(
          `Solution is already saved. You can only modify your Code Submission!.`,
        );
      return error;
    }
  }

  async findAll() {
    return await this.solutionRepository.findAll();
  }

  async update(
    userid: any,
    solutionId: string,
    updateSolutionDto: UpdateSolutionDto,
  ) {
    if (updateSolutionDto.code === '// Upload your working solution!')
      throw new NotAcceptableException(
        `Seems your solution is fishy!. Please Upload your working code!.`,
      );

    try {
      await this.solutionRepository.update(
        userid,
        solutionId,
        updateSolutionDto,
      );

      return { data: `We have updated your Updated Solution!` };
    } catch (error) {
      return error;
    }
  }

  async resetProgressByQuestionTopicId(userId: string, questionId: string) {
    try {
      const data = await this.solutionRepository.resetProgressByQuestionTopicId(
        userId,
        questionId,
      );
      return {
        data: { ...data },
        message: 'We have reseted your progress on this topic!',
      };
    } catch (error) {
      return error;
    }
  }
}
