import { Test, TestingModule } from '@nestjs/testing';
import { LostDogsController } from './lost.controller';

describe('LostController', () => {
  let controller: LostDogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LostDogsController],
    }).compile();

    controller = module.get<LostDogsController>(LostDogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
