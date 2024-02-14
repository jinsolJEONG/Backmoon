import { Test, TestingModule } from '@nestjs/testing';
import { StrayDogsService } from './straydogs.service';

describe('StraydogsService', () => {
  let service: StrayDogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StrayDogsService],
    }).compile();

    service = module.get<StrayDogsService>(StrayDogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
