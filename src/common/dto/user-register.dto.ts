import {
    IsAlphanumeric,
    IsEmail, IsIn,
    IsString,
    Matches,
    MaxLength,
    MinLength
} from 'class-validator';

export class UserRegisterDto {
    @IsEmail()
    email: string;

    @IsIn(["Guest","User","Supervisor","Admin"])
    role: string;

    @IsString()
    @MinLength(8)
    @MaxLength(16)
    @IsAlphanumeric()
    @Matches(/^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/)
    password: string;

    @IsString()
    rpassword: string;
}
