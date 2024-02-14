import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Request, Response, NextFunction } from 'express';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization; // 헤더에서 토큰 가져옴

    if (!token) {
      throw new UnauthorizedException('토큰이 없습니다.');
    }

    // 캐시에서 토큰 정보 가져오기
    const cachedToken = await this.cacheManager.get(token);

    if (!cachedToken) {
      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }

    // 다음 미들웨어로 진행
    next();
  }
}
