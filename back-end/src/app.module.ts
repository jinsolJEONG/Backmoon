import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { DogsModule } from './dogs/dog/dogs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from '../ormconfig';
import { ConfigModule } from '@nestjs/config';
import { StrayDogsModule } from './dogs/straydogs/straydogs.module';
import { LostDogsModule } from './dogs/lostdogs/lost.module';
import { AdoptedDogsModule } from './dogs/adopteddog/adopteddog.module';
import { DeadDogsModule } from './dogs/deaddog/deaddog.module';
import { UrgentDogModule } from './dogs/urgentdog/urgentdog.module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';
import { TokenMiddleware } from 'middleware/token.middleware';
import { ReservationModule } from './reservation/reservation.module';
import * as express from 'express';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { WebsocketGateway } from './websocket/websocket.gateway';
import { WebSocket2Module } from './web-socket2/web-socket2.module';
import { WebSocket2Gateway } from './web-socket2/web-socket2.gateway';
@Module({
  imports: [

    // 서버용
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', '../public')
    // }),
    // 서버 빌드테스트
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../../front-end/build')
    }),

    CacheModule.register({
      isGlobal: true,
      ttl: 60,
    }),
    DogsModule,
    StrayDogsModule,
    LostDogsModule,
    AdoptedDogsModule,
    DeadDogsModule,
    ConfigModule.forRoot({
      envFilePath: ['./development.env'],
    }),
    TypeOrmModule.forRoot(ormconfig),
    LostDogsModule,
    AdoptedDogsModule,
    DeadDogsModule,
    UrgentDogModule,
    AdminModule,
    UserModule,
    AuthModule,
    ReservationModule,
  ],
  providers: [WebsocketGateway, WebSocket2Gateway]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenMiddleware)
      .forRoutes({ path: 'dog', method: RequestMethod.ALL })
      .apply(express.static(join(__dirname, '..', '../uploads')))
      .forRoutes('uploads');
  }
}
