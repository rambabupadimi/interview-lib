import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { createReviewDto, updateReviewDto } from './dto/review.dto';
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

    async update(req: updateReviewDto){
        try{
            const reviewExists = await this.prisma.reviews.findUnique({
                where: {
                  id: req.review_id,
                  status: "ACTIVE"
                },
              });
            if (!reviewExists) throw new ForbiddenException("Invalid review.");

            const techExists = await this.prisma.technologies.findUnique({
                where: {
                  id: req.technology_id,
                  status: "ACTIVE"
                },
              });
              if (!techExists) throw new ForbiddenException("Invalid technology.");

              const review = await this.prisma.reviews.update({
                where: {
                    id: req.review_id,
                    status: "ACTIVE"
                },
                data:{
                    technology_id: req.technology_id,
                    description: req.description,
                    title: req.title
                },
                select:{
                    id: true,
                    technology_id: true,
                    title: true,
                    description: true,
                    status: true
                }
            })

            return {
                statusCode: 200,
                message: "Review has been updated successfully.",
                data: review
            }
        }catch(error){
            if(error.response.error != 'Forbidden')
                throw new BadRequestException("Something went wrong.")
            else throw error;
        }
    }

    async delete(id: number){
        try{
            const reviewExists = await this.prisma.reviews.findUnique({
                where: {
                  id: id,
                  status: "ACTIVE"
                },
              });
            if (!reviewExists) throw new ForbiddenException("Invalid review.");

            await this.prisma.reviews.update({
                where: {
                    id: id
                },
                data: {
                    status: "DELETED"
                }
            })

            return {
                statusCode: 200,
                message: "Review has been deleted successfully.",
              }
        }catch(error){
            if(error.response.error != 'Forbidden')
                throw new BadRequestException("Something went wrong.")
            else throw error;
        }
    }

    async list(technologyId: number){
        try{
          const list = await this.prisma.reviews.findMany({
            where:{technology_id: technologyId,status: "ACTIVE"},
            select:{
                id: true,
                title: true,
                description: true,
                status: true,
                technology_id: true,
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
