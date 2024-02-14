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
exports.ReservationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const reservation_entity_1 = require("./entities/reservation.entity");
let ReservationService = exports.ReservationService = class ReservationService {
    constructor(reservationRepository) {
        this.reservationRepository = reservationRepository;
    }
    async getReservedTimeByDate(date) {
        if (!this.isValidDate(date)) {
            date = new Date();
        }
        console.log(date);
        const StartDay = new Date(date);
        StartDay.setHours(0, 0, 0, 0);
        const EndDay = new Date(date);
        EndDay.setHours(23, 59, 59, 999);
        const VisitReservations = await this.reservationRepository.find({
            where: {
                ReservationDatetime: (0, typeorm_1.Between)(StartDay, EndDay),
                Type: 'visit',
            },
        });
        const PlayReservations = await this.reservationRepository.find({
            where: {
                ReservationDatetime: (0, typeorm_1.Between)(StartDay, EndDay),
                Type: 'play',
            },
        });
        const VisitReservedTimes = VisitReservations.map((reservation) => {
            return reservation.ReservationDatetime.getHours().toString();
        });
        let VisitResult = [];
        for (let i = 9; i <= 17; i++) {
            if (!VisitReservedTimes.includes(i.toString())) {
                VisitResult.push(`${i.toString()} : false`);
            }
            else {
                VisitResult.push(`${i.toString()} : true`);
            }
        }
        const PlayReservedTimes = PlayReservations.map((reservation) => {
            return reservation.ReservationDatetime.getHours().toString();
        });
        let PlayResult = [];
        for (let i = 9; i <= 17; i++) {
            if (!PlayReservedTimes.includes(i.toString())) {
                PlayResult.push(`${i.toString()} : false`);
            }
            else {
                PlayResult.push(`${i.toString()} : true`);
            }
        }
        const Result = {
            'type: visit': VisitResult,
            'type: play': PlayResult,
        };
        return Result;
    }
    isValidDate(date) {
        return !isNaN(date.getTime());
    }
    async deleteOne(ID) {
        return await this.reservationRepository.delete({ ReservationID: ID });
    }
    async getByDogID(id) {
        const reservations = await this.reservationRepository.find({
            where: { DogID: id },
        });
        return reservations.map((reservation) => {
            reservation.ReservationDatetime.setHours(reservation.ReservationDatetime.getHours() + 9);
            return reservation;
        });
    }
    async createReservation(reservationData) {
        return await this.reservationRepository.save(reservationData);
    }
    async getByUserID(sequence) {
        const reservations = await this.reservationRepository.find({
            where: { seq: sequence },
        });
        return reservations.map((reservation) => {
            reservation.ReservationDatetime.setHours(reservation.ReservationDatetime.getHours() + 9);
            return reservation;
        });
    }
};
exports.ReservationService = ReservationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(reservation_entity_1.Reservation)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ReservationService);
//# sourceMappingURL=reservation.service.js.map