import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword } from "class-validator";


export class createDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    password: string;
}

export class updateDto {
    @IsNumber()
    @IsNotEmpty()
    user_id: number;

    @IsString()
    @IsOptional()
    name: string
}