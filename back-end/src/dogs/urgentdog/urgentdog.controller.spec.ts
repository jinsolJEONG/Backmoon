import { Test, TestingModule } from '@nestjs/testing';
import { UrgentDogController } from './urgentdog.controller';

describe('UrgentdogController', () => {
  let controller: UrgentDogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrgentDogController],
    }).compile();

    controller = module.get<UrgentDogController>(UrgentDogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
