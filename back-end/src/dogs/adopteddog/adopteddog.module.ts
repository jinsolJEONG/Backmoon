import { Module } from '@nestjs/common';
import { Dog } from 'src/dogs/entities/dogs.entity';
import { Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdoptedDogsService } from './adopteddog.service';
import { AdoptedDogsController } from './adopteddog.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Dog])],
  controllers: [AdoptedDogsController],
  providers: [AdoptedDogsService,Repository]
})
export class AdoptedDogsModule {}
