import { Test, TestingModule } from '@nestjs/testing';
import { AdopteddogController } from './adopteddog.controller';

describe('AdopteddogController', () => {
  let controller: AdopteddogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdopteddogController],
    }).compile();

    controller = module.get<AdopteddogController>(AdopteddogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
