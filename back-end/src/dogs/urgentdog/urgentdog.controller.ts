import { Controller, Get, Param } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UrgentDogService } from './urgentdog.service';
import { Dog } from 'src/dogs/entities/dogs.entity';
@Controller('api/urgentdog')
export class UrgentDogController {
  constructor(
    private readonly urgentDogService: UrgentDogService,

  ) {}
  private dogs: Dog[] = [];

  @Get()
  getRecommendedDogs()  {
    return this.urgentDogService.getRecommendedDogs();
  }
}
