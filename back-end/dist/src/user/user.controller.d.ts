import { UserService } from './user.service';
import { CreateUserDto } from './DTO/create.user.dto';
import { User } from './entities/user.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUserInfo(req: any): Promise<Partial<User>>;
    create(createUserDto: CreateUserDto): Promise<any>;
    deleteUser(req: any): Promise<void>;
    updateUser(req: any, updateData: any): Promise<void>;
}
