import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { createReviewDto } from './dto/review.dto';
import { UserDto } from '../auth/dto';

@Injectable()
export class ReviewService {
    constructor(private prisma: PrismaService){}

    async create(req: createReviewDto, user: UserDto){
        try{

            const userExists = await this.prisma.technologies.findUnique({
                where: {
                  id: req.technology_id,
                  status: "ACTIVE"
                },
            });
            if (!userExists) throw new ForbiddenException("Invalid technology id.");

            const review = await this.prisma.reviews.create({
                data:{
                    title: req.title,
                    description: req.description,
                    user_id: user.id,
                    technology_id: req.technology_id
                },
                select:{
                    id: true,
                    title: true,
                    description: true,
                    status: true,
                    user:{
                        select:{
                            id: true,
                            name: true,
                            email: true
                        }
                    }
                }
            })

            return {
                statusCode: 201,
                message: "Review has been created successfully.",
                data: review
            }
        }catch(error){
            if(error.response.error != 'Forbidden')
                throw new BadRequestException("Something went wrong.")
            else throw error;
        }
    }

    async list(){
        try{
          const list = await this.prisma.reviews.findMany({
            where:{status: "ACTIVE"},
            select:{
                id: true,
                title: true,
                description: true,
                status: true,
                user:{
                    select:{
                        id: true,
                        name: true,
                        status: true
                    }
                }
            },
            orderBy: {created_at: "desc"}
          })
          
          return {
            statusCode: 200,
            message: "Reviews list fetched successfully.",
            data: list
          }
        }catch(error){
          throw new BadRequestException("Something went wrong.")
        }
      }
}
