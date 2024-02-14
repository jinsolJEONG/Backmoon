import { Dog } from '../entities/dogs.entity';
import { Repository } from 'typeorm';
export declare class UrgentDogService {
    private dogsRepository;
    constructor(dogsRepository: Repository<Dog>);
    getRecommendedDogs(): Promise<any>;
}
