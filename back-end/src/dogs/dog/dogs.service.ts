import { Injectable, NotFoundException } from '@nestjs/common';
import { Dog } from '../entities/dogs.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {CreateDogDto } from '../DTO/create.dog.dto';

@Injectable()
export class DogsService {
  constructor(
    @InjectRepository(Dog)
    private dogsRepository: Repository<Dog>,
  ) {}
  private dogs : Dog[] = [];

  async getDogs( ){
    return (await this.dogsRepository.find()).reverse();
  }
  async getDogsCount(){
    return await this.dogsRepository.count();
  }
  // async findAll(): Promise<User[]> {
  //   return this.userRepository.find({
  //     select: ['seq', 'UserID', 'Name', 'Admin'],
  //   });
  // }
  // async getOne(DogID: number): Promise<any> {
  //   const dog = await this.dogsRepository.findOneBy({DogID});
  //   return dog;
  // }

  // async deleteOne(DogID: number): Promise<any> {
  //   this.getOne(DogID);
  //   this.dogs = this.dogs.filter((dog) => dog.DogID === DogID)
  // }

  // async create(dogData : CreateDogDto) {
  //   await this.dogsRepository.save({...dogData});
  // }

  // update(DogID: number, updateData) {
  //   const dog = this.getOne(DogID);
  //   this.deleteOne(DogID);
  //   this.dogs.push({...dog, ...updateData});
  // }
}
