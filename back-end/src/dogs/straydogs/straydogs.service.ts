import { Injectable, NotFoundException, UploadedFile } from '@nestjs/common';
import { Dog } from 'src/dogs/entities/dogs.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDogDto } from 'src/dogs/DTO/create.dog.dto';
import { UpdateDogDto } from 'src/dogs/DTO/update.dog.dto';

@Injectable()
export class StrayDogsService {
  constructor(
    @InjectRepository(Dog)
    private dogsRepository: Repository<Dog>,
  ) {}
  async getAllStrayDogs(): Promise<any> {
    const dogs = (
      await this.dogsRepository.find({ where: { Status: 'Stray' } })
    ).reverse();
    return dogs;
  }
  async getAllStrayDogsCount() {
    const count = await this.dogsRepository.count({
      where: { Status: 'Stray' },
    });
    return count;
  }
  async getOneStrayDog(DogID: number): Promise<Dog> {
    const dog = this.dogsRepository.findOneBy({
      Status: 'Stray',
      DogID: DogID,
    });
    return dog;
  }
  async deleteOne(DogID: number): Promise<void> {
    this.getOneStrayDog(DogID);
    this.dogsRepository.delete(DogID);
  }

  async create(dogData: CreateDogDto, filePath: string): Promise<void> {
    dogData.Status = 'Stray';
    dogData.Image = filePath;
    await this.dogsRepository.save(dogData);
  }

  async update(DogID: number, updateData: UpdateDogDto): Promise<void> {
    await this.dogsRepository.update(DogID, updateData);
  }
}
