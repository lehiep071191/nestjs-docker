import { IsOptional, IsDate, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserRequestDto {

    @IsOptional()
    @IsString()
    secretKeySuperAdmin?: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsOptional()
    @IsDate()
    birthday: string;

    @IsOptional()
    @IsString()
    address: string;

    @IsString()
    @IsNotEmpty()
    userName: string
}