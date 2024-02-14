// image.controller.ts

import {
  Controller,
  Post,
  Get,
  Param,
  UploadedFile,
  UseInterceptors,
  Res,
  Put,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { Response } from 'express';
@Controller('api/image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post(':DogID')
  @UseInterceptors(FileInterceptor('Image'))
  async uploadFile(@UploadedFile() file, @Param('DogID') DogID: number) {
    const filePath = file.path;
    await this.imageService.updateImage(DogID, filePath);
    return { filePath };
  }

  @Get(':DogID')
  async getImage(@Param('DogID') DogID: number, @Res() res: Response) {
    const imagePath = await this.imageService.getImage(DogID);
    return res.sendFile(imagePath);
  }

  @Put(':DogID')
  @UseInterceptors(FileInterceptor('Image'))
  async updateImage(@UploadedFile() file, @Param('DogID') DogID: number) {
    const filePath = file.path;
    await this.imageService.updateImage(DogID, filePath);
    return { filePath };
  }
}
