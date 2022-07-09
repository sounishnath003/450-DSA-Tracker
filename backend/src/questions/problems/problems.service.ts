import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepository } from 'src/auth/user.repository';
import { UUIDV4 } from 'src/shared/utility.methods';
import { SolutionRepository } from 'src/solution/solution.repository';
import { Solution, SolutionDocument } from 'src/solution/solution.schema';
import { CreateProblemDto } from './dto/create-problem.dto';
import { updateProblemDto } from './dto/update-problem.dto';
import { ProblemsRepository } from './problems.repository';
import { Vote, VoteDocument, VOTETYPE } from './voting.schema';

@Injectable()
export class ProblemsService {
  constructor(
    private problemRepo: ProblemsRepository,
    private userRepo: UserRepository,
    @InjectModel(Solution.name) private solutionSchema: Model<SolutionDocument>,
    @InjectModel(Vote.name) private voteSchema: Model<VoteDocument>,
    private solutionRepo: SolutionRepository,
  ) {}

  async createProblem(createProblemDto: CreateProblemDto) {
    try {
      await this.problemRepo.create(createProblemDto);
      return { data: `New Problem Has Been Created!` };
    } catch (error) {
      return error;
    }
  }

  async updateProblem(
    userId: any,
    problemId: string,
    updateParams: updateProblemDto,
  ) {
    try {
      const user = await this.userRepo.findOne({ username: 'sounishnath003' });
      if (user.id !== userId) throw new UnauthorizedException();
      await this.problemRepo.update(problemId, updateParams);
      return { data: 'Problem Has Been Updated!!' };
    } catch (error) {
      return error;
    }
  }

  async getInformation(userid: string, problemId: string) {
    return {
      data: await this.solutionRepo.getCompleteInformationOfTheProblem(
        userid,
        problemId,
      ),
    };
  }

  async updateVote(user: any, problemId: string, voteType: VOTETYPE) {
    const alreadySubmited = await this.voteSchema.findOne({
      userId: user.id,
      problemId,
      voteType,
    });

    if (alreadySubmited) {
      if (alreadySubmited.voteType === voteType)
        return {
          data: {
            updated: false,
            voteType,
            problemId,
            voteId: alreadySubmited.id,
          },
        };
      else {
        // toggle
        await this.problemRepo.findOneAndUpdateVote(
          { id: problemId },
          voteType,
          alreadySubmited.voteType === voteType,
        );
        alreadySubmited.voteType = voteType;
        alreadySubmited.updatedAt = new Date();
        await alreadySubmited.save();
        return {
          data: {
            updated: true,
            voteType,
            problemId,
            voteId: alreadySubmited.id,
          },
        };
      }
    }

    const vote = new this.voteSchema({
      id: UUIDV4(),
      userId: user.id,
      problemId,
      voteType,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await vote.save();
    await this.problemRepo.findOneAndUpdateVote({ id: problemId }, voteType);
    return { data: { updated: true, voteType, problemId, voteId: vote.id } };
  }
}
