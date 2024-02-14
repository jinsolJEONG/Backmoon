import { IsString, IsNumber, IsDateString } from 'class-validator';
import { IsNull } from 'typeorm';

export class CreateReservationDto {

  @IsNumber()
  DogID: number;

  @IsNumber()
  seq: number;

  @IsDateString()
  ReservationDatetime: Date;

  @IsString()
  Confirm: string;

  @IsString()
  Type: string;
}
