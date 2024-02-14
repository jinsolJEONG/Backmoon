import { Module } from '@nestjs/common';
import { WebSocket2Gateway } from './web-socket2.gateway';

@Module({
  providers: [WebSocket2Gateway]
})
export class WebSocket2Module {}
