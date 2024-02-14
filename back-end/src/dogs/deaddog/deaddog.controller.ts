import { Query, Controller, Get, Param} from '@nestjs/common';
import { DeadDogsService } from './deaddog.service';

@Controller('api/deaddog')
export class DeadDogsController {
  constructor(
    private readonly deadDogsService: DeadDogsService
  ) {}
  @Get()
  async getDeadDogs(@Query('page') page: number = 1, @Query('pageSize') pageSize:number = 10):Promise<any> {
    const DeadDogs = await this.deadDogsService.getAllDeadDogs();
    const totalItem = await this.deadDogsService.getAllDeadDogsCount();
    if(isNaN(page)||isNaN(pageSize)){
      page=1;
      pageSize=totalItem;
    }
    const startIndex = (page-1) * pageSize;
    const endIndex = startIndex + pageSize;
    const DeadDog = DeadDogs.slice(startIndex,endIndex);
    return {totalItem, DeadDog};
  }
}