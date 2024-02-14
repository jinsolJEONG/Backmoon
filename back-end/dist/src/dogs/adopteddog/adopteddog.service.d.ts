import { Dog } from 'src/dogs/entities/dogs.entity';
import { Repository } from 'typeorm';
export declare class AdoptedDogsService {
    private dogsRepository;
    constructor(dogsRepository: Repository<Dog>);
    getAllAdoptedDogs(): Promise<any>;
    getAllAdoptedDogsCount(): Promise<number>;
}
