import { EndpointService } from './endpoint.service';
export declare class EndpointController {
    private readonly endpointService;
    constructor(endpointService: EndpointService);
    getResponse(req: any): Promise<void>;
}
