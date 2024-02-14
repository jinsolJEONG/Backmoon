"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DogsModule = void 0;
const common_1 = require("@nestjs/common");
const dogs_controller_1 = require("./dogs.controller");
const dogs_service_1 = require("./dogs.service");
const dogs_entity_1 = require("../entities/dogs.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let DogsModule = exports.DogsModule = class DogsModule {
};
exports.DogsModule = DogsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_2.TypeOrmModule.forFeature([dogs_entity_1.Dog])],
        controllers: [dogs_controller_1.DogsController],
        providers: [dogs_service_1.DogsService, typeorm_1.Repository],
    })
], DogsModule);
//# sourceMappingURL=dogs.module.js.map