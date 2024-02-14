import { Test, TestingModule } from '@nestjs/testing';
import { AdopteddogService } from './adopteddog.service';

describe('AdopteddogService', () => {
  let service: AdopteddogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdopteddogService],
    }).compile();

    service = module.get<AdopteddogService>(AdopteddogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
