import { Injectable } from '@nestjs/common';
import {UserService} from "../user/user.service";
import {comparePasswords} from "../common/helpers/password.helper";

@Injectable()
export class AuthService {
    constructor(private readonly userService:UserService) {
    }

    async validateUser(email,password){
        const candidate = await this.userService.findUserByEmail(email)

        if(!candidate) throw Error(`User is not fond`)

        const hashPass = await comparePasswords(password,candidate.password)

        if(!hashPass) throw Error(`Invalid password`)

        return {
            userId:candidate.id,
            userEmail:candidate.email
        }
    }
}
