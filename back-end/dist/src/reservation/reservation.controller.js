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
exports.ReservationController = void 0;
const common_1 = require("@nestjs/common");
const reservation_service_1 = require("./reservation.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const user_service_1 = require("../user/user.service");
const create_reservation_dto_1 = require("./DTO/create.reservation.dto");
let ReservationController = exports.ReservationController = class ReservationController {
    constructor(reservationService, userService) {
        this.reservationService = reservationService;
        this.userService = userService;
    }
    async getReservationByUserID(req) {
        const user = await this.userService.findOne(req.user.UserID);
        const reservation = await this.reservationService.getByUserID(user.seq);
        return { reservation };
    }
    async getReservedTimeByDate(date = new Date()) {
        return this.reservationService.getReservedTimeByDate(date);
    }
    async deleteOne(ID) {
        return await this.reservationService.deleteOne(ID);
    }
    async getDog(id) {
        const reservation = await this.reservationService.getByDogID(id);
        return { reservation };
    }
    async createReservation(reservationData, req) {
        const user = await this.userService.findOne(req.user.UserID);
        reservationData.Confirm = "pending";
        reservationData.seq = user.seq;
        return this.reservationService.createReservation(reservationData);
    }
};
__decorate([
    (0, common_1.Get)('/user'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "getReservationByUserID", null);
__decorate([
    (0, common_1.Get)('/state'),
    __param(0, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Date]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "getReservedTimeByDate", null);
__decorate([
    (0, common_1.Delete)('/:reservationID'),
    __param(0, (0, common_1.Param)('reservationID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "deleteOne", null);
__decorate([
    (0, common_1.Get)('/dog/:dogID'),
    __param(0, (0, common_1.Param)('dogID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "getDog", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_reservation_dto_1.CreateReservationDto, Object]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "createReservation", null);
exports.ReservationController = ReservationController = __decorate([
    (0, common_1.Controller)('api/reservation'),
    __metadata("design:paramtypes", [reservation_service_1.ReservationService,
        user_service_1.UserService])
], ReservationController);
//# sourceMappingURL=reservation.controller.js.map