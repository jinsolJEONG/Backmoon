import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './DTO/create.user.dto';
export declare const bcryptConstant: {
    saltOrRounds: number;
};
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<any>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<Partial<User>>;
    findAllCount(): Promise<number>;
    deleteUser(user: any): Promise<void>;
    updateUser(user: any, updateData: any): Promise<void>;
}
