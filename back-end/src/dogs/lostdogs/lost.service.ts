import { Injectable, NotFoundException } from '@nestjs/common';
import { Dog } from 'src/dogs/entities/dogs.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDogDto } from 'src/dogs/DTO/create.dog.dto';
import { UpdateDogDto } from 'src/dogs/DTO/update.dog.dto';

@Injectable()
export class LostDogsService {
  constructor(
    @InjectRepository(Dog)
    private dogsRepository: Repository<Dog>,
  ) {}
  async getAllLostDogs(): Promise<any> {
    const dogs = (
      await this.dogsRepository.find({ where: { Status: 'Lost' } })
    ).reverse();
    return dogs;
  }
  async getAllLostDogsCount() {
    const count = this.dogsRepository.count({ where: { Status: 'Lost' } });
    return count;
  }
  async getOneLostDog(DogID: number): Promise<Dog> {
    const LostDog = this.dogsRepository.findOneBy({
      Status: 'Lost',
      DogID: DogID,
    });
    return LostDog;
  }
  async deleteOne(DogID: number): Promise<void> {
    this.getOneLostDog(DogID);
    this.dogsRepository.delete(DogID);
  }

  async create(dogData: CreateDogDto, filePath: string): Promise<void> {
    dogData.Status = 'Lost';
    dogData.Image = filePath;
    await this.dogsRepository.save(dogData);
  }

  async update(DogID: number, updateData: UpdateDogDto): Promise<void> {
    await this.dogsRepository.update(DogID, updateData);
  }
}
