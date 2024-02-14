import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './DTO/create.user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './DTO/update.user.dto';
import { isUndefined } from 'util';
import { isEmpty } from 'class-validator';

export const bcryptConstant = {
  saltOrRounds: 10,
};

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    const isExist = await this.userRepository.findOneBy({
      UserID: createUserDto.UserID,
    });
    if (isExist) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`이미 등록된 사용자입니다.`],
        error: 'Forbidden',
      });
    }

    createUserDto.Password = await bcrypt.hash(
      createUserDto.Password,
      bcryptConstant.saltOrRounds,
    );
    const { Password, ...result } = await this.userRepository.save(
      createUserDto,
    );
    return result;
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users;
  }

  async findOne(id: string): Promise<Partial<User>> {
    const user = await this.userRepository.findOneBy({ UserID: id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    const {
      seq,
      Name,
      UserID,
      Password,
      Admin,
      Email,
      PhoneNumber,
      Nickname,
      Address,
    } = user;
    return {
      seq,
      Name,
      UserID,
      Password,
      Admin,
      Email,
      PhoneNumber,
      Nickname,
      Address,
    };
  }

  async findAllCount() {
    return this.userRepository.count();
  }
  async deleteUser(user) {
    await this.userRepository.remove(user);
  }
  async updateUser(user, updateData) {
    let result = {...user};
  
    // 기존 유저 정보 복사
    result.Name = updateData.Name;
    result.Email = updateData.Email;
    result.PhoneNumber = updateData.PhoneNumber;
    result.Nickname = updateData.Nickname;
    result.Address = updateData.Address;

    if (updateData.newPassword !== null && updateData.newPassword!==undefined) {
      const isMatch = await bcrypt.compare(updateData.currentPassword, user.Password);
      if (!isMatch) {
        throw new BadRequestException('Current password is incorrect');
      }
      
      const hashedPassword = await bcrypt.hash(updateData.newPassword, bcryptConstant.saltOrRounds);
      result.Password = hashedPassword;
    } 
  
    // userRepository 업데이트
    this.userRepository.update(user, result);
  } 
  
  
}
