import { Module } from '@nestjs/common';
import { Dog } from 'src/dogs/entities/dogs.entity';
import { Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LostDogsService } from './lost.service';
import { LostDogsController } from './lost.controller';
import { multerOptionsFactory } from 'src/common/utils/multer.options.factory';
import { MulterModule } from '@nestjs/platform-express';
@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: multerOptionsFactory,
    }),
    TypeOrmModule.forFeature([Dog]),
  ],
  controllers: [LostDogsController],
  providers: [LostDogsService, Repository],
})
export class LostDogsModule {}
