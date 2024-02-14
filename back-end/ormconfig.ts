import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Dog } from 'src/dogs/entities/dogs.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { User } from 'src/user/entities/user.entity';
dotenv.config();
const ormconfig: TypeOrmModuleOptions = {
  type: 'mariadb', // 어떤 DB인가?
  host: '163.239.223.177', // DB host
  port: 13306, // DB port
  username: 'dog', // 사용자명
  password: 'ssafy@c106', // 사용자 패스워드
  database: 'dog', // 스키마 이름
  entities: [User, Dog, Reservation],
  synchronize: true, // 테이블을 생성할꺼냐 묻는 속성, 최초에 한번만 true
  // timezone:'+09:00',
};

export default ormconfig;
