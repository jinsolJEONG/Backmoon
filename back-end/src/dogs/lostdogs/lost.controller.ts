import {
  Query,
  Controller,
  Get,
  Param,
  Delete,
  Put,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Request
} from '@nestjs/common';
import { LostDogsService } from './lost.service';
import { UpdateDogDto } from 'src/dogs/DTO/update.dog.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
@Controller('api/lostdog')
export class LostDogsController {
  constructor(private readonly lostDogsService: LostDogsService) {}
  @Get()
  async getDogs(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 100,
  ): Promise<any> {
    const lostDogs = await this.lostDogsService.getAllLostDogs();
    const totalItem = await this.lostDogsService.getAllLostDogsCount();
    if (isNaN(page) || isNaN(pageSize)) {
      page = 1;
      pageSize = totalItem;
    }
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const lostDog = lostDogs.slice(startIndex, endIndex);
    return { totalItem, lostDog };
  }
  @Get('/:id')
  getOneLostDog(@Param('id') ID: number) {
    return this.lostDogsService.getOneLostDog(ID);
  }
  @Delete('/:id')
  deleteOne(@Param('id') ID: number): Promise<any> {
    return this.lostDogsService.deleteOne(ID);
  }

  @Post()
  @UseInterceptors(FileInterceptor('Image'))
  async create(@Body() dogData, @UploadedFile() file, @Request() req) {
      if (dogData.EnteredDay === '') {
        dogData.EnteredDay = null;
      }
      if (dogData.LostDate === '') {
        dogData.LostDate = null;
      }
      if (dogData.RemainedDay === '') {
        dogData.RemainedDay = null;
      }
      let filePath = null;
      if (file) {
        filePath = path.basename(file.path);
        dogData.Image = filePath;
      }
      await this.lostDogsService.create(dogData, filePath);
      return { success: true, message: 'Dog created successfully!' };
  }

  @Put('/:id')
  @UseInterceptors(FileInterceptor('Image'))
  async updateDog(
    @Param('id') DogID: number,
    @Body() updateData: UpdateDogDto,
    @UploadedFile() file,
  ) {
    let filePath = null;
    if (file) {
      filePath =  path.basename(file.path);
      updateData.Image = filePath;
    }
    await this.lostDogsService.update(DogID, updateData);
    return { success: true, message: 'Dog updated successfully!' };
  }
}
