import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  Inject,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager/dist';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(UserID: string, Password: string): Promise<any> {
    const user = await this.userRepository.findOneBy({ UserID });

    if (!user) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`등록되지 않은 사용자입니다.`],
        error: 'Forbidden',
      });
    } else {
    }

    const isMatch = await bcrypt.compare(Password, user.Password);

    if (isMatch) {
      const { Password, ...result } = user;
      return result;
    } else {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`사용자 정보가 일치하지 않습니다.`],
        error: 'Forbidden',
      });
    }
  }

  async login(user: any) {
    const payload = {
      UserID: user.UserID,
      Name: user.Name,
      seq: user.seq,
      Admin: user.Admin,
    }; // 필요한 필드 추가

    // JWT 토큰 생성
    const token = this.jwtService.sign(payload);

    await this.cacheManager.set(token, JSON.stringify(user),0);

    return {
      accessToken: token,
      UserID: user.UserID,
      Admin: user.Admin,
    };
  }
}
