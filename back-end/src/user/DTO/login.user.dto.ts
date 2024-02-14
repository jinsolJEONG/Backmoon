import { IsString } from 'class-validator';

export class LoginUserDto {
  @IsString()
  UserID: string;

  @IsString()
  Password: string;
}
