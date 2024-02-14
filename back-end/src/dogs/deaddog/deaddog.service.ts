import { Injectable, NotFoundException } from '@nestjs/common';
import { Dog } from 'src/dogs/entities/dogs.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DeadDogsService {
  constructor(
    @InjectRepository(Dog)
    private dogsRepository: Repository<Dog>,
  ) {}
  async getAllDeadDogs( ):Promise<any>{
    const dogs = (await this.dogsRepository.find({where: {Status:"Dead"}})).reverse();
    return dogs;
  }
  async getAllDeadDogsCount(){
    const totalItem = this.dogsRepository.count({where:{Status:"Dead"}});
    return totalItem;
  }
}
