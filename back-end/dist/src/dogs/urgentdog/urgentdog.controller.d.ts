import { UrgentDogService } from './urgentdog.service';
export declare class UrgentDogController {
    private readonly urgentDogService;
    constructor(urgentDogService: UrgentDogService);
    private dogs;
    getRecommendedDogs(): Promise<any>;
}
