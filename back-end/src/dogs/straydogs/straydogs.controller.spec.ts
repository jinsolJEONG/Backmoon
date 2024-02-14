import { Test, TestingModule } from '@nestjs/testing';
import { StrayDogsController } from './straydogs.controller';

describe('StraydogsController', () => {
  let controller: StrayDogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StrayDogsController],
    }).compile();

    controller = module.get<StrayDogsController>(StrayDogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
