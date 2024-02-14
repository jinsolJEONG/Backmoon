"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrayDogsModule = void 0;
const common_1 = require("@nestjs/common");
const straydogs_controller_1 = require("./straydogs.controller");
const straydogs_service_1 = require("./straydogs.service");
const dogs_entity_1 = require("../entities/dogs.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const multer_options_factory_1 = require("../../common/utils/multer.options.factory");
const platform_express_1 = require("@nestjs/platform-express");
let StrayDogsModule = exports.StrayDogsModule = class StrayDogsModule {
};
exports.StrayDogsModule = StrayDogsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            platform_express_1.MulterModule.registerAsync({
                useFactory: multer_options_factory_1.multerOptionsFactory,
            }),
            typeorm_2.TypeOrmModule.forFeature([dogs_entity_1.Dog]),
        ],
        controllers: [straydogs_controller_1.StrayDogsController],
        providers: [straydogs_service_1.StrayDogsService, typeorm_1.Repository],
    })
], StrayDogsModule);
//# sourceMappingURL=straydogs.module.js.map