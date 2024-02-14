import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Reservation)
        private reservationRepository: Repository<Reservation>,
      ) {}
    async findAllReservation() {
        const reservations = await this.reservationRepository.find();
        return reservations.map((reservation) => {
            reservation.ReservationDatetime.setHours(reservation.ReservationDatetime.getHours());
            return reservation; // 수정된 reservation 객체를 반환합니다.
        });
    }
    async findAllReservationCount(){
        return await this.reservationRepository.count();
    }
}
