import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { createTechDto, updateTechDto } from './dto/technology.dto';

@Injectable()
export class TechnologyService {
    constructor(private prisma: PrismaService){}

    async create(req: createTechDto){
        try{

            const techExists = await this.prisma.technologies.findUnique({
                where: {
                  code: req.code,
                  status: "ACTIVE"
                },
              });
              if (techExists) throw new ForbiddenException("Code already exists.");

            const technology = await this.prisma.technologies.create({
                data:{
                    code: req.code,
                    name: req.name,
                    description: req.description
                },
                select:{
                    id: true,
                    code: true,
                    name: true,
                    description: true,
                    image_key: true,
                    status: true
                }
            })

            return {
                statusCode: 201,
                message: "Technology has been created successfully.",
                data: technology
            }
        }catch(error){
            throw new BadRequestException("Something went wrong.")
        }
    }

    async update(req: updateTechDto){
        try{
            const userExists = await this.prisma.technologies.findUnique({
                where: {
                  id: req.technology_id,
                  status: "ACTIVE"
                },
              });
              if (!userExists) throw new ForbiddenException("Invalid technology.");

              const technology = await this.prisma.technologies.update({
                where: {
                    id: req.technology_id,
                    status: "ACTIVE"
                },
                data:{
                    code: req.code,
                    name: req.name,
                    description: req.description
                },
                select:{
                    id: true,
                    code: true,
                    name: true,
                    description: true,
                    image_key: true,
                    status: true
                }
            })

            return {
                statusCode: 200,
                message: "Technology has been updated successfully.",
                data: technology
            }
        }catch(error){
            if(error.response.error != 'Forbidden')
                throw new BadRequestException("Something went wrong.")
            else throw error;
        }
    }

    async delete(id: number){
        try{
            const userExists = await this.prisma.technologies.findUnique({
                where: {
                  id: id,
                  status: "ACTIVE"
                },
              });
              if (!userExists) throw new ForbiddenException("Invalid technology.");

            await this.prisma.technologies.update({
                where: {
                    id: id
                },
                data: {
                    status: "DELETED"
                }
            })

            return {
                statusCode: 200,
                message: "Technology has been deleted successfully.",
              }
        }catch(error){
            if(error.response.error != 'Forbidden')
                throw new BadRequestException("Something went wrong.")
            else throw error;
        }
    }

    async list(){
        try{
          const list = await this.prisma.technologies.findMany({
            where:{status: "ACTIVE"},
            select:{
                id: true,
                code: true,
                name: true,
                description: true,
                image_key: true,
                status: true
            }
          })
          
          return {
            statusCode: 200,
            message: "Technologies list fetched successfully.",
            data: list
          }
        }catch(error){
          throw new BadRequestException("Something went wrong.")
        }
    }
}
