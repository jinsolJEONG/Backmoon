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
exports.StrayDogsService = void 0;
const common_1 = require("@nestjs/common");
const dogs_entity_1 = require("../entities/dogs.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let StrayDogsService = exports.StrayDogsService = class StrayDogsService {
    constructor(dogsRepository) {
        this.dogsRepository = dogsRepository;
    }
    async getAllStrayDogs() {
        const dogs = (await this.dogsRepository.find({ where: { Status: 'Stray' } })).reverse();
        return dogs;
    }
    async getAllStrayDogsCount() {
        const count = await this.dogsRepository.count({
            where: { Status: 'Stray' },
        });
        return count;
    }
    async getOneStrayDog(DogID) {
        const dog = this.dogsRepository.findOneBy({
            Status: 'Stray',
            DogID: DogID,
        });
        return dog;
    }
    async deleteOne(DogID) {
        this.getOneStrayDog(DogID);
        this.dogsRepository.delete(DogID);
    }
    async create(dogData, filePath) {
        dogData.Status = 'Stray';
        dogData.Image = filePath;
        await this.dogsRepository.save(dogData);
    }
    async update(DogID, updateData) {
        await this.dogsRepository.update(DogID, updateData);
    }
};
exports.StrayDogsService = StrayDogsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(dogs_entity_1.Dog)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], StrayDogsService);
//# sourceMappingURL=straydogs.service.js.map