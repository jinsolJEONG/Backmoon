import { Dog } from '../entities/dogs.entity';
import { Repository } from 'typeorm';
export declare class DogsService {
    private dogsRepository;
    constructor(dogsRepository: Repository<Dog>);
    private dogs;
    getDogs(): Promise<Dog[]>;
    getDogsCount(): Promise<number>;
}
