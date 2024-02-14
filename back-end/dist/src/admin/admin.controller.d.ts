import { DogsService } from 'src/dogs/dog/dogs.service';
import { UserService } from 'src/user/user.service';
import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly dogService;
    private readonly userService;
    private readonly adminService;
    constructor(dogService: DogsService, userService: UserService, adminService: AdminService);
    getDogs(page: number, pageSize: number, req: any): Promise<any>;
    getUser(page: number, pageSize: number, req: any): Promise<any>;
    getOneUser(ID: string, req: any): Promise<Partial<import("../user/entities/user.entity").User>>;
    getReservation(page: number, pageSize: number, req: any): Promise<{
        totalItem: number;
        reservation: import("../reservation/entities/reservation.entity").Reservation[];
    }>;
}
