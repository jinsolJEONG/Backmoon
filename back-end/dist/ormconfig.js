"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const dogs_entity_1 = require("./src/dogs/entities/dogs.entity");
const reservation_entity_1 = require("./src/reservation/entities/reservation.entity");
const user_entity_1 = require("./src/user/entities/user.entity");
dotenv.config();
const ormconfig = {
    type: 'mariadb',
    host: '163.239.223.177',
    port: 13306,
    username: 'dog',
    password: 'ssafy@c106',
    database: 'dog',
    entities: [user_entity_1.User, dogs_entity_1.Dog, reservation_entity_1.Reservation],
    synchronize: true,
};
exports.default = ormconfig;
//# sourceMappingURL=ormconfig.js.map