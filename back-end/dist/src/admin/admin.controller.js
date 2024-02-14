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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const dogs_service_1 = require("../dogs/dog/dogs.service");
const user_service_1 = require("../user/user.service");
const admin_service_1 = require("./admin.service");
let AdminController = exports.AdminController = class AdminController {
    constructor(dogService, userService, adminService) {
        this.dogService = dogService;
        this.userService = userService;
        this.adminService = adminService;
    }
    async getDogs(page = 1, pageSize = 100, req) {
        const isAdmin = req.user.Admin;
        if (isAdmin) {
            const Dogs = await this.dogService.getDogs();
            const totalItem = await this.dogService.getDogsCount();
            if (isNaN(page) || isNaN(pageSize)) {
                page = 1;
                pageSize = totalItem;
            }
            const startIndex = (page - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            const Dog = Dogs.slice(startIndex, endIndex);
            return { totalItem, Dog };
        }
        else {
            throw new common_1.ForbiddenException({
                statusCode: common_1.HttpStatus.FORBIDDEN,
                message: [`사용자 정보가 일치하지 않습니다.`],
                error: 'Forbidden',
            });
        }
    }
    async getUser(page = 1, pageSize = 100, req) {
        const isAdmin = req.user.Admin;
        if (isAdmin) {
            const users = (await this.userService.findAll()).reverse();
            const totalItem = await this.userService.findAllCount();
            if (isNaN(page) || isNaN(pageSize)) {
                page = 1;
                pageSize = totalItem;
            }
            const startIndex = (page - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            const user = users.slice(startIndex, endIndex);
            return { totalItem, user };
        }
        else {
            throw new common_1.ForbiddenException({
                statusCode: common_1.HttpStatus.FORBIDDEN,
                message: [`사용자 정보가 일치하지 않습니다.`],
                error: 'Forbidden',
            });
        }
    }
    async getOneUser(ID, req) {
        console.log('1');
        const isAdmin = req.user.Admin;
        if (isAdmin) {
            console.log('2');
            const user = await this.userService.findOne(ID);
            return user;
        }
        else {
            throw new common_1.ForbiddenException({
                statusCode: common_1.HttpStatus.FORBIDDEN,
                message: [`사용자 정보가 일치하지 않습니다.`],
                error: 'Forbidden',
            });
        }
    }
    async getReservation(page = 1, pageSize = 100, req) {
        const isAdmin = req.user.Admin;
        if (isAdmin) {
            const reservations = (await this.adminService.findAllReservation()).reverse();
            const totalItem = await this.adminService.findAllReservationCount();
            if (isNaN(page) || isNaN(pageSize)) {
                page = 1;
                pageSize = totalItem;
            }
            const startIndex = (page - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            const reservation = reservations.slice(startIndex, endIndex);
            return { totalItem, reservation };
        }
        else {
            throw new common_1.ForbiddenException({
                statusCode: common_1.HttpStatus.FORBIDDEN,
                message: [`사용자 정보가 일치하지 않습니다.`],
                error: 'Forbidden',
            });
        }
    }
};
__decorate([
    (0, common_1.Get)('/dogs'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('pageSize')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getDogs", null);
__decorate([
    (0, common_1.Get)('/users'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('pageSize')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getUser", null);
__decorate([
    (0, common_1.Get)('/user/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getOneUser", null);
__decorate([
    (0, common_1.Get)('/reservation'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('pageSize')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getReservation", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('/api/admin/'),
    __metadata("design:paramtypes", [dogs_service_1.DogsService,
        user_service_1.UserService,
        admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map