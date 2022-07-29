import { Injectable } from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {UserEntity} from "../entities/user.entity";

@Injectable()
export class DatabaseConnectionService {
    mySqlConfig;
    constructor(private readonly configService:ConfigService) {
        this.mySqlConfig = {
            type: 'mysql',
            host: this.configService.get<string>(`MYSQL_HOST`),
            port: this.configService.get<number>(`MYSQL_PORT`),
            username: this.configService.get<string>(`MYSQL_USERNAME`),
            password: this.configService.get<string>(`MYSQL_PASSWORD`),
            database: this.configService.get<string>(`MYSQL_DATABASE`),
            entities: [UserEntity],
            synchronize: true
        }
    }

    async getMySQLConfig(){
        return this.mySqlConfig
    }

}
