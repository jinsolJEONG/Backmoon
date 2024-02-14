import { Module } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PlayController } from './play.controller';
import { PlayService } from './play.service';
@Module({
  imports: [],
  controllers: [PlayController],
  providers: [PlayService, Repository],
})
export class PlayModule {}
