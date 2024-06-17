import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { createDto, updateDto } from './dto/user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService
    ){}
    async create(userReq: createDto) {
        try {
            const userExists = await this.prisma.users.findUnique({
              where: {
                email: userReq.email,
              },
            });
            if (userExists) throw new ForbiddenException("User already registered.");

            return await this.createUser(userReq)
        } catch (error) {
          if(error.response.error != 'Forbidden')
            throw new ForbiddenException("Invalid email.");
          else throw error;
        }
    }

    async createUser(userReq:createDto){
        try{
          let hash = null
          if(userReq.password){
            const salt = bcrypt.genSaltSync(10);
            hash = bcrypt.hashSync(userReq.password, salt);
          }
          
          const user = await this.prisma.users.create({
            data: {
                name: userReq.name,
                email: userReq.email,
                password_hash: hash,
                role: "ADMIN",
                status: "ACTIVE"
            },
            select:{
                id: true,
                name: true,
                email: true
            }
          });
          return {
            statusCode: 200,
            message: "Sign up successfully.",
            data: user
          }
        }catch(error){
          throw new BadRequestException("Something went wrong.")
        }
    }

    async update(req: updateDto){
        try{
            const userExists = await this.prisma.users.findUnique({
                where: {
                  id: req.user_id,
                  status: "ACTIVE"
                },
              });
              if (!userExists) throw new ForbiddenException("Invalid user.");

              const user = await this.prisma.users.update({
                where: {
                    id: req.user_id
                },
                data: {
                    name: req.name
                },
                select:{
                    id: true,
                    name: true,
                    email: true
                }
              });
              return {
                statusCode: 200,
                message: "User updated successfully.",
                data: user
              }
        }catch(error){
            if(error.response.error != 'Forbidden')
                throw new BadRequestException("Something went wrong.")
            else throw error;
        }
    }

    async delete(id: number){
        try{
            const userExists = await this.prisma.users.findUnique({
                where: {
                  id: id,
                  status: "ACTIVE"
                },
            });
            if (!userExists) throw new ForbiddenException("Invalid user.");

            await this.prisma.users.update({
                where: {
                    id: id
                },
                data: {
                    status: "DELETED"
                }
            })

            return {
                statusCode: 200,
                message: "User deleted successfully.",
              }
        }catch(error){
            if(error.response.error != 'Forbidden')
                throw new BadRequestException("Something went wrong.")
            else throw error;
        }
    }

    async list(){
      try{
        const list = await this.prisma.users.findMany({
          where:{status: "ACTIVE"},
          select:{
            id: true,
            name: true,
            email: true,
            role: true,
          }
        })
        
        return {
          statusCode: 200,
          message: "Users list fetched successfully.",
          data: list
        }
      }catch(error){
        throw new BadRequestException("Something went wrong.")
      }
    }
}
