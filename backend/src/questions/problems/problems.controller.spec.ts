import { Test, TestingModule } from '@nestjs/testing';
import { ProblemsController } from './problems.controller';

describe('ProblemsController', () => {
  let controller: ProblemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProblemsController],
    }).compile();

    controller = module.get<ProblemsController>(ProblemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
