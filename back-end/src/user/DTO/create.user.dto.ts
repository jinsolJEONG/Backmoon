import { IsString, IsNumber, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  Name: string;

  @IsString()
  UserID: string;

  @IsString()
  Password: string;

  @IsString()
  PhoneNumber: string;

  @IsString()
  Nickname: string;

  @IsString()
  Address: string;

  @IsEmail()
  Email: string;

  @IsNumber()
  Admin: number;
}
