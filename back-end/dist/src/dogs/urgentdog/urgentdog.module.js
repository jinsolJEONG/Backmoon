"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrgentDogModule = void 0;
const common_1 = require("@nestjs/common");
const dogs_entity_1 = require("../entities/dogs.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const urgentdog_service_1 = require("./urgentdog.service");
const urgentdog_controller_1 = require("./urgentdog.controller");
let UrgentDogModule = exports.UrgentDogModule = class UrgentDogModule {
};
exports.UrgentDogModule = UrgentDogModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_2.TypeOrmModule.forFeature([dogs_entity_1.Dog])],
        controllers: [urgentdog_controller_1.UrgentDogController],
        providers: [urgentdog_service_1.UrgentDogService, typeorm_1.Repository]
    })
], UrgentDogModule);
//# sourceMappingURL=urgentdog.module.js.map