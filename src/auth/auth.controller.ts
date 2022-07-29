import {Body, Controller, Get, Post, Redirect, Request, UseGuards} from '@nestjs/common';
import {UserLoginDto} from "../common/dto/user-login.dto";
import {AuthGuard} from "@nestjs/passport";
import {AuthenticatedGuard} from "./authenticated.guard";
import {LocalAuthGuard} from "./local.auth.guard";

@Controller('auth')
export class AuthController {
    constructor() {
    }

    @UseGuards(LocalAuthGuard)
    @Post(`login`)
    @Redirect(`http://localhost:3000/home`)
    async login(@Body() body:UserLoginDto,@Request() req){
        return req.user
    }

    @Get('logout')
    logout(@Request() req): any {
        req.session.destroy();
        return { msg: 'The user session has ended' }
    }
}
