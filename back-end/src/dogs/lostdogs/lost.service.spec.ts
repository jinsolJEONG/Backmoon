import { Test, TestingModule } from '@nestjs/testing';
import { LostDogsService } from './lost.service';

describe('LostService', () => {
  let service: LostDogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LostDogsService],
    }).compile();

    service = module.get<LostDogsService>(LostDogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
