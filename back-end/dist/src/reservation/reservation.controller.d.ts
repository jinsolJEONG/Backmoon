import { ReservationService } from './reservation.service';
import { UserService } from 'src/user/user.service';
import { CreateReservationDto } from './DTO/create.reservation.dto';
export declare class ReservationController {
    private readonly reservationService;
    private readonly userService;
    constructor(reservationService: ReservationService, userService: UserService);
    getReservationByUserID(req: any): Promise<{
        reservation: import("./entities/reservation.entity").Reservation[];
    }>;
    getReservedTimeByDate(date?: Date): Promise<any>;
    deleteOne(ID: number): Promise<import("typeorm").DeleteResult>;
    getDog(id: number): Promise<{
        reservation: import("./entities/reservation.entity").Reservation[];
    }>;
    createReservation(reservationData: CreateReservationDto, req: any): Promise<CreateReservationDto & import("./entities/reservation.entity").Reservation>;
}
