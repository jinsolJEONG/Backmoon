import { Injectable, NotFoundException } from '@nestjs/common';
import { Dog } from 'src/dogs/entities/dogs.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AdoptedDogsService {
  constructor(
    @InjectRepository(Dog)
    private dogsRepository: Repository<Dog>,
  ) {}
  async getAllAdoptedDogs( ):Promise<any>{
    const dogs = (await this.dogsRepository.find({where:{Status: "Adopted"}})).reverse();
    return dogs;
  }
  async getAllAdoptedDogsCount(){
    const totalItem = this.dogsRepository.count({where: {Status:"Adopted"}});
    return totalItem;
  }
}
