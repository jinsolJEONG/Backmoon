import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
export declare class AuthService {
    private cacheManager;
    private userRepository;
    private jwtService;
    constructor(cacheManager: Cache, userRepository: Repository<User>, jwtService: JwtService);
    validateUser(UserID: string, Password: string): Promise<any>;
    login(user: any): Promise<{
        accessToken: string;
        UserID: any;
        Admin: any;
    }>;
}
