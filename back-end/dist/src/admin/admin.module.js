"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const admin_controller_1 = require("./admin.controller");
const dogs_service_1 = require("../dogs/dog/dogs.service");
const dogs_entity_1 = require("../dogs/entities/dogs.entity");
const user_entity_1 = require("../user/entities/user.entity");
const user_service_1 = require("../user/user.service");
const admin_service_1 = require("./admin.service");
const reservation_entity_1 = require("../reservation/entities/reservation.entity");
let AdminModule = exports.AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_2.TypeOrmModule.forFeature([dogs_entity_1.Dog]), typeorm_2.TypeOrmModule.forFeature([user_entity_1.User]), typeorm_2.TypeOrmModule.forFeature([reservation_entity_1.Reservation])],
        controllers: [admin_controller_1.AdminController],
        providers: [dogs_service_1.DogsService, user_service_1.UserService, typeorm_1.Repository, admin_service_1.AdminService]
    })
], AdminModule);
//# sourceMappingURL=admin.module.js.map