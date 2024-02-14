import { CreateDogDto } from './create.dog.dto';
import { IsDateString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
export class UpdateDogDto extends PartialType(CreateDogDto) {
  [key: string]: any;
}
