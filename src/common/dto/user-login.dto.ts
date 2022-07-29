import {
    IsEmail,
    IsString,
} from 'class-validator';

export class UserLoginDto {
    @IsEmail()
    username: string;

    @IsString()
    password: string;

}
