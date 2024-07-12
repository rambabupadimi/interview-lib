import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { createDto, updateDto } from './dto/user.dto';
import { RolesGuard, UserJwtGuard } from '../auth/guard';
import { Roles } from '../auth/decorator';

@UseGuards(UserJwtGuard)
@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Post('create')
    @HttpCode(201)
    // @Roles("ADMIN")
    create(@Body() body: createDto) {
      return this.userService.create(body);
    }

    @Put('update')
    @HttpCode(200)
    // @Roles("ADMIN")
    update(@Body() body: updateDto) {
      return this.userService.update(body);
    }

    @Delete('delete/:id')
    @HttpCode(200)
    // @Roles("ADMIN")
    delete(@Param("id", ParseIntPipe) id: number){
        return this.userService.delete(id);
    }

    @Get('list')
    @HttpCode(200)
    // @Roles("ADMIN")
    list(){
        return this.userService.list();
    }
}
