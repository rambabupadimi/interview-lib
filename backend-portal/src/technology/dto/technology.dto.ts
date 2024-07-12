import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class createTechDto {
    @IsNotEmpty()
    @IsString()
    code: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;
}

export class updateTechDto {
    @IsNotEmpty()
    @IsNumber()
    technology_id: number;

    @IsOptional()
    @IsString()
    code: string;

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description: string;
}