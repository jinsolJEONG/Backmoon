import { Module } from '@nestjs/common';
import { Dog } from '../entities/dogs.entity';
import { Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrgentDogService } from './urgentdog.service';
import { UrgentDogController } from './urgentdog.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Dog])],
  controllers: [UrgentDogController],
  providers: [UrgentDogService,Repository]
})
export class UrgentDogModule {}
