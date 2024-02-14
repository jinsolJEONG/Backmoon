import { DeadDogsService } from './deaddog.service';
export declare class DeadDogsController {
    private readonly deadDogsService;
    constructor(deadDogsService: DeadDogsService);
    getDeadDogs(page?: number, pageSize?: number): Promise<any>;
}
