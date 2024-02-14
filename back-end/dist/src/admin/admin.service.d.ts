import { Reservation } from 'src/reservation/entities/reservation.entity';
import { Repository } from 'typeorm';
export declare class AdminService {
    private reservationRepository;
    constructor(reservationRepository: Repository<Reservation>);
    findAllReservation(): Promise<Reservation[]>;
    findAllReservationCount(): Promise<number>;
}
