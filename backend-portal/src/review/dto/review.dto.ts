import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


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

export class updateReviewDto {
    @IsNotEmpty({message:"Review id should not be empty."})
    @IsNumber({},{message:"Review id must be a number."})
    review_id: number

    @IsNotEmpty()
    @IsNumber()
    technology_id: number;

    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description: string;
}