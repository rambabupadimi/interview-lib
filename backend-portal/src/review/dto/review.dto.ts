import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class createReviewDto {

    @IsNotEmpty()
    @IsNumber()
    technology_id: number;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;
}