import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Reservation]),TypeOrmModule.forFeature([User])],
  controllers: [ReservationController],
  providers: [ReservationService, Repository,UserService]
})
export class ReservationModule {}
