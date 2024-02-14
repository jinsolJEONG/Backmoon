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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const dist_1 = require("@nestjs/cache-manager/dist");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const user_entity_1 = require("../user/entities/user.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let AuthService = exports.AuthService = class AuthService {
    constructor(cacheManager, userRepository, jwtService) {
        this.cacheManager = cacheManager;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async validateUser(UserID, Password) {
        const user = await this.userRepository.findOneBy({ UserID });
        if (!user) {
            throw new common_1.ForbiddenException({
                statusCode: common_1.HttpStatus.FORBIDDEN,
                message: [`등록되지 않은 사용자입니다.`],
                error: 'Forbidden',
            });
        }
        else {
        }
        const isMatch = await bcrypt.compare(Password, user.Password);
        if (isMatch) {
            const { Password, ...result } = user;
            return result;
        }
        else {
            throw new common_1.ForbiddenException({
                statusCode: common_1.HttpStatus.FORBIDDEN,
                message: [`사용자 정보가 일치하지 않습니다.`],
                error: 'Forbidden',
            });
        }
    }
    async login(user) {
        const payload = {
            UserID: user.UserID,
            Name: user.Name,
            seq: user.seq,
            Admin: user.Admin,
        };
        const token = this.jwtService.sign(payload);
        await this.cacheManager.set(token, JSON.stringify(user), 0);
        return {
            accessToken: token,
            UserID: user.UserID,
            Admin: user.Admin,
        };
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(dist_1.CACHE_MANAGER)),
    __param(1, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [Object, typeorm_1.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map