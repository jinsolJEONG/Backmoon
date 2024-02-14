"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeadDogsModule = void 0;
const common_1 = require("@nestjs/common");
const dogs_entity_1 = require("../entities/dogs.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const deaddog_service_1 = require("./deaddog.service");
const deaddog_controller_1 = require("./deaddog.controller");
let DeadDogsModule = exports.DeadDogsModule = class DeadDogsModule {
};
exports.DeadDogsModule = DeadDogsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_2.TypeOrmModule.forFeature([dogs_entity_1.Dog])],
        controllers: [deaddog_controller_1.DeadDogsController],
        providers: [deaddog_service_1.DeadDogsService, typeorm_1.Repository]
    })
], DeadDogsModule);
//# sourceMappingURL=deaddog.module.js.map