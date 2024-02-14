import { DogsService } from './dogs.service';
import { Dog } from '../entities/dogs.entity';
export declare class DogsController {
    private readonly dogService;
    constructor(dogService: DogsService);
    private dogs;
    getDogs(req: any): Promise<{
        dog: Dog[];
    }>;
}
