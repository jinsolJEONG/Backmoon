import { Query, Controller, Get, Param, Delete, Put, Patch,Post,Body } from '@nestjs/common';
import { UpdateDogDto } from 'src/dogs/DTO/update.dog.dto';
import { AdoptedDogsService } from './adopteddog.service';

@Controller('api/adopteddog')
export class AdoptedDogsController {
  constructor(
    private readonly adoptedDogsService: AdoptedDogsService
  ) {}
  @Get()
  async getDogs(@Query('page') page: number = 1, @Query('pageSize') pageSize:number = 10):Promise<any> {
    const adoptedDogs = await this.adoptedDogsService.getAllAdoptedDogs();
    const totalItem = await this.adoptedDogsService.getAllAdoptedDogsCount();
    if(isNaN(page)||isNaN(pageSize)){
      page=1;
      pageSize=totalItem;
    }
    const startIndex = (page-1) * pageSize;
    const endIndex = startIndex + pageSize;
    const adoptedDog = adoptedDogs.slice(startIndex,endIndex);
    return {totalItem, adoptedDog};
  }
}