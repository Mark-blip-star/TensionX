import { Module } from '@nestjs/common';
import { DatabaseConnectionModule } from './database-connection/database-connection.module';
import { ConfigModule } from '@nestjs/config';
import {TypeOrmModule} from "@nestjs/typeorm";
import {DatabaseConnectionService} from "./database-connection/database-connection.service";
import {join} from "path"
import { AppGateway } from './app.gateway';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    imports:[DatabaseConnectionModule],
    inject:[DatabaseConnectionService],
    useFactory:async(
        databaseConnectionService:DatabaseConnectionService
    ) => databaseConnectionService.getMySQLConfig()
  }),
      ConfigModule.forRoot({
        envFilePath:join(__dirname,`../.env`),
        isGlobal:true
      }),
    DatabaseConnectionModule,
    UserModule,
    AuthModule,
    HomeModule
  ],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
