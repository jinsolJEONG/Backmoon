"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdoptedDogsModule = void 0;
const common_1 = require("@nestjs/common");
const dogs_entity_1 = require("../entities/dogs.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const adopteddog_service_1 = require("./adopteddog.service");
const adopteddog_controller_1 = require("./adopteddog.controller");
let AdoptedDogsModule = exports.AdoptedDogsModule = class AdoptedDogsModule {
};
exports.AdoptedDogsModule = AdoptedDogsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_2.TypeOrmModule.forFeature([dogs_entity_1.Dog])],
        controllers: [adopteddog_controller_1.AdoptedDogsController],
        providers: [adopteddog_service_1.AdoptedDogsService, typeorm_1.Repository]
    })
], AdoptedDogsModule);
//# sourceMappingURL=adopteddog.module.js.map