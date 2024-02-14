import { Injectable } from '@nestjs/common';
import { Dog } from '../entities/dogs.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UrgentDogService {
  constructor(
    @InjectRepository(Dog)
    private dogsRepository: Repository<Dog>,
  ) {}

  async getRecommendedDogs(): Promise<any> {
    const urgentdogs = await this.dogsRepository
    .createQueryBuilder('dog')
      .where('dog.Status IN (:...status)', { status: ['Stray'] })
      .orderBy('dog.RemainedDay', 'ASC')
      .addOrderBy('dog.Age', 'DESC')
      .addOrderBy('dog.EnteredDay', 'DESC')
      .take(4)
      .getMany();
    return urgentdogs;
  }
}
