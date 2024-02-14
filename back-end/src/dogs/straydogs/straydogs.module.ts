import { Module } from '@nestjs/common';
import { StrayDogsController } from './straydogs.controller';
import { StrayDogsService } from './straydogs.service';
import { Dog } from 'src/dogs/entities/dogs.entity';
import { Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { multerOptionsFactory } from 'src/common/utils/multer.options.factory';
import { MulterModule } from '@nestjs/platform-express';
@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: multerOptionsFactory,
    }),
    TypeOrmModule.forFeature([Dog]),
  ],
  controllers: [StrayDogsController],
  providers: [StrayDogsService, Repository],
})
export class StrayDogsModule {}
