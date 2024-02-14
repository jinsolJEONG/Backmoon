import { Module } from '@nestjs/common';
import { DogsController } from './dogs.controller';
import { DogsService } from './dogs.service';
import { Dog } from '../entities/dogs.entity';
import { Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Dog])],
  controllers: [DogsController],
  providers: [DogsService, Repository],
})
export class DogsModule {}
