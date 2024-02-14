import { Dog } from 'src/dogs/entities/dogs.entity';
import { Repository } from 'typeorm';
import { CreateDogDto } from 'src/dogs/DTO/create.dog.dto';
import { UpdateDogDto } from 'src/dogs/DTO/update.dog.dto';
export declare class LostDogsService {
    private dogsRepository;
    constructor(dogsRepository: Repository<Dog>);
    getAllLostDogs(): Promise<any>;
    getAllLostDogsCount(): Promise<number>;
    getOneLostDog(DogID: number): Promise<Dog>;
    deleteOne(DogID: number): Promise<void>;
    create(dogData: CreateDogDto, filePath: string): Promise<void>;
    update(DogID: number, updateData: UpdateDogDto): Promise<void>;
}
