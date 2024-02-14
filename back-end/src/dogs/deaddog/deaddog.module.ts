import { Module } from '@nestjs/common';
import { Dog } from 'src/dogs/entities/dogs.entity';
import { Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeadDogsService } from './deaddog.service';
import { DeadDogsController } from './deaddog.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Dog])],
  controllers: [DeadDogsController],
  providers: [DeadDogsService,Repository]
})
export class DeadDogsModule {}
