import { Test, TestingModule } from '@nestjs/testing';
import { WebSocket2Gateway } from './web-socket2.gateway';

describe('WebSocket2Gateway', () => {
  let gateway: WebSocket2Gateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebSocket2Gateway],
    }).compile();

    gateway = module.get<WebSocket2Gateway>(WebSocket2Gateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
