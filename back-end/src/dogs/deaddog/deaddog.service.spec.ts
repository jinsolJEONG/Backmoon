import { Test, TestingModule } from '@nestjs/testing';
import { DeadDogsService } from './deaddog.service';

describe('DeaddogService', () => {
  let service: DeadDogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeadDogsService],
    }).compile();

    service = module.get<DeadDogsService>(DeadDogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
