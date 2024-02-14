"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LostDogsModule = void 0;
const common_1 = require("@nestjs/common");
const dogs_entity_1 = require("../entities/dogs.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const lost_service_1 = require("./lost.service");
const lost_controller_1 = require("./lost.controller");
const multer_options_factory_1 = require("../../common/utils/multer.options.factory");
const platform_express_1 = require("@nestjs/platform-express");
let LostDogsModule = exports.LostDogsModule = class LostDogsModule {
};
exports.LostDogsModule = LostDogsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            platform_express_1.MulterModule.registerAsync({
                useFactory: multer_options_factory_1.multerOptionsFactory,
            }),
            typeorm_2.TypeOrmModule.forFeature([dogs_entity_1.Dog]),
        ],
        controllers: [lost_controller_1.LostDogsController],
        providers: [lost_service_1.LostDogsService, typeorm_1.Repository],
    })
], LostDogsModule);
//# sourceMappingURL=lost.module.js.map