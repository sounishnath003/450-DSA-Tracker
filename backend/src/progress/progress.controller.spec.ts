import { Test, TestingModule } from '@nestjs/testing';
import { ProgressController } from './progress.controller';

describe('ProgressController', () => {
  let controller: ProgressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgressController],
    }).compile();

    controller = module.get<ProgressController>(ProgressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
