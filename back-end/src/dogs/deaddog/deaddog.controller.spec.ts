import { Test, TestingModule } from '@nestjs/testing';
import { DeadDogsController } from './deaddog.controller';

describe('DeaddogController', () => {
  let controller: DeadDogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeadDogsController],
    }).compile();

    controller = module.get<DeadDogsController>(DeadDogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
