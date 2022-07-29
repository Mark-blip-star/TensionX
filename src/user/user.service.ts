import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../entities/user.entity";
import {Repository} from "typeorm";
import {checkPasswordRepeat, hashPassword} from "../common/helpers/password.helper";
import {UserRoleEnum} from "../common/enums/user-role.enam";

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository:Repository<UserEntity>) {
    }
    async createUser(dto){
        const {email,role,password,rpassword} = dto

        const candidate = await this.userRepository.findOne({where:{email}})
        if(candidate) throw Error(`The user is already exists`)

        const samePassword = checkPasswordRepeat(password,rpassword)

        if(!samePassword) throw Error(`The passwords are not same`)

        const hashPass = hashPassword(password)

        if(!hashPass) throw Error(`Try later.`)

        if(!Object.values(UserRoleEnum).includes(role)) throw Error(`Role doest not exist`)

        return await this.userRepository.save({email,password:hashPass,role})
    }

    async findUserByEmail(email:string){
        return await this.userRepository.findOne({where:{email}})
    }
}
