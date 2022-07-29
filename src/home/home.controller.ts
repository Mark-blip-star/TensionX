import {Controller, Get, UseGuards,Response,Request} from '@nestjs/common';
import {AuthenticatedGuard} from "../auth/authenticated.guard";

@Controller('home')
export class HomeController {

    @UseGuards(AuthenticatedGuard)
    @Get()
    async getHome(@Response() res,@Request() req){
        res.render(`home`,{
            user:req.user,
            email:req.user.userEmail
        })
    }
}
