import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { multerOptionsFactory } from 'src/common/utils/multer.options.factory';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dog } from 'src/dogs/entities/dogs.entity';
@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: multerOptionsFactory,
    }),
    TypeOrmModule.forFeature([Dog]),
  ],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
