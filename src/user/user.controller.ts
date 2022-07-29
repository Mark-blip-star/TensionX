import {Body, Controller, Post, Redirect} from '@nestjs/common';
import {UserRegisterDto} from "../common/dto/user-register.dto";
import {UserService} from "./user.service";

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService) {
    }

    @Post(`create-user`)
    @Redirect('http://localhost:3000', 201)
    async createUser(@Body() dto:UserRegisterDto){
        await this.userService.createUser(dto)
    }
}
