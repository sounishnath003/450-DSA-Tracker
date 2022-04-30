import { Test, TestingModule } from '@nestjs/testing';
import { SolutionService } from './solution.service';

describe('SolutionService', () => {
  let service: SolutionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SolutionService],
    }).compile();

    service = module.get<SolutionService>(SolutionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
