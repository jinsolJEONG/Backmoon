// image.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dog } from 'src/dogs/entities/dogs.entity';
@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Dog)
    private dogRepository: Repository<Dog>,
  ) {}

  async updateImage(DogID: number, imagePath: string) {
    const dog = await this.dogRepository.findOneBy({ DogID: DogID });

    dog.Image = imagePath;
    return this.dogRepository.save(dog);
  }

  async getImage(DogID: number) {
    const dog = await this.dogRepository.findOneBy({ DogID: DogID });
    return dog.Image;
  }
}
