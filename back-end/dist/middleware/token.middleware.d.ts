import { NestMiddleware } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Request, Response, NextFunction } from 'express';
export declare class TokenMiddleware implements NestMiddleware {
    private readonly cacheManager;
    constructor(cacheManager: Cache);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
