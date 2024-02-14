"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = exports.bcryptConstant = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = require("bcrypt");
exports.bcryptConstant = {
    saltOrRounds: 10,
};
let UserService = exports.UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(createUserDto) {
        const isExist = await this.userRepository.findOneBy({
            UserID: createUserDto.UserID,
        });
        if (isExist) {
            throw new common_1.ForbiddenException({
                statusCode: common_1.HttpStatus.FORBIDDEN,
                message: [`이미 등록된 사용자입니다.`],
                error: 'Forbidden',
            });
        }
        createUserDto.Password = await bcrypt.hash(createUserDto.Password, exports.bcryptConstant.saltOrRounds);
        const { Password, ...result } = await this.userRepository.save(createUserDto);
        return result;
    }
    async findAll() {
        const users = await this.userRepository.find();
        return users;
    }
    async findOne(id) {
        const user = await this.userRepository.findOneBy({ UserID: id });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found.`);
        }
        const { seq, Name, UserID, Password, Admin, Email, PhoneNumber, Nickname, Address, } = user;
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
        let result = { ...user };
        result.Name = updateData.Name;
        result.Email = updateData.Email;
        result.PhoneNumber = updateData.PhoneNumber;
        result.Nickname = updateData.Nickname;
        result.Address = updateData.Address;
        if (updateData.newPassword !== null && updateData.newPassword !== undefined) {
            const isMatch = await bcrypt.compare(updateData.currentPassword, user.Password);
            if (!isMatch) {
                throw new common_1.BadRequestException('Current password is incorrect');
            }
            const hashedPassword = await bcrypt.hash(updateData.newPassword, exports.bcryptConstant.saltOrRounds);
            result.Password = hashedPassword;
        }
        this.userRepository.update(user, result);
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map