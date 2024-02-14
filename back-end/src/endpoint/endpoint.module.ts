import { Module } from '@nestjs/common';
import { EndpointController } from './endpoint.controller';
import { EndpointService } from './endpoint.service';

@Module({
  controllers: [EndpointController],
  providers: [EndpointService]
})
export class EndpointModule {}
