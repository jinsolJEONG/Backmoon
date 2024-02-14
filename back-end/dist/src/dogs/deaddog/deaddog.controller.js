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
exports.DeadDogsController = void 0;
const common_1 = require("@nestjs/common");
const deaddog_service_1 = require("./deaddog.service");
let DeadDogsController = exports.DeadDogsController = class DeadDogsController {
    constructor(deadDogsService) {
        this.deadDogsService = deadDogsService;
    }
    async getDeadDogs(page = 1, pageSize = 10) {
        const DeadDogs = await this.deadDogsService.getAllDeadDogs();
        const totalItem = await this.deadDogsService.getAllDeadDogsCount();
        if (isNaN(page) || isNaN(pageSize)) {
            page = 1;
            pageSize = totalItem;
        }
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const DeadDog = DeadDogs.slice(startIndex, endIndex);
        return { totalItem, DeadDog };
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('pageSize')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], DeadDogsController.prototype, "getDeadDogs", null);
exports.DeadDogsController = DeadDogsController = __decorate([
    (0, common_1.Controller)('api/deaddog'),
    __metadata("design:paramtypes", [deaddog_service_1.DeadDogsService])
], DeadDogsController);
//# sourceMappingURL=deaddog.controller.js.map