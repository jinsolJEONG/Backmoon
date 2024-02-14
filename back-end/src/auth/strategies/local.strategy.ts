import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'UserID', // User 엔터티의 필드와 일치하게 변경
      passwordField: 'Password', // User 엔터티의 필드와 일치하게 변경 (선택 사항)
    });
  }

  async validate(UserID: string, Password: string): Promise<any> {
    const user = await this.authService.validateUser(UserID, Password);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
