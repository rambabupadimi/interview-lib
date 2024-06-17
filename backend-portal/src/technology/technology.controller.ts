import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { UserJwtGuard } from '../auth/guard';
import { TechnologyService } from './technology.service';
import { createTechDto, updateTechDto } from './dto/technology.dto';

@UseGuards(UserJwtGuard)
@Controller('technology')
export class TechnologyController {
    constructor(private technologyService: TechnologyService){}

    @Post('create')
    @HttpCode(201)
    // @Roles("ADMIN")
    create(@Body() body: createTechDto) {
      return this.technologyService.create(body);
    }

    @Put('update')
    @HttpCode(200)
    // @Roles("ADMIN")
    update(@Body() body: updateTechDto) {
      return this.technologyService.update(body);
    }

    @Delete('delete/:id')
    @HttpCode(200)
    // @Roles("ADMIN")
    delete(@Param("id", ParseIntPipe) id: number){
        return this.technologyService.delete(id);
    }

    @Get('list')
    @HttpCode(200)
    // @Roles("ADMIN")
    list(){
        return this.technologyService.list();
    }
}
