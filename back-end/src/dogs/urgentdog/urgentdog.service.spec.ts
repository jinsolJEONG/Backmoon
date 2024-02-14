import { Test, TestingModule } from '@nestjs/testing';
import { UrgentDogService } from './urgentdog.service';

describe('UrgentdogService', () => {
  let service: UrgentDogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UrgentDogService],
    }).compile();

    service = module.get<UrgentDogService>(UrgentDogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
