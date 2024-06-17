import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { UserJwtGuard } from '../auth/guard';
import { ReviewService } from './review.service';
import {GetUser} from '../auth/decorator';
import { createReviewDto } from './dto/review.dto';
import { UserDto } from '../auth/dto';

@UseGuards(UserJwtGuard)
@Controller('review')
export class ReviewController {
    constructor(private reviewService: ReviewService){}

    @Post('create')
    @HttpCode(201)
    create(@Body() body: createReviewDto, @GetUser() user: UserDto) {
      return this.reviewService.create(body, user);
    }

    // @Put('update')
    // @HttpCode(200)
    // @Roles("ADMIN")
    // update(@Body() body: updateTechDto) {
    //   return this.technologyService.update(body);
    // }

    // @Delete('delete/:id')
    // @HttpCode(200)
    // @Roles("ADMIN")
    // delete(@Param("id", ParseIntPipe) id: number){
    //     return this.technologyService.delete(id);
    // }

    @Get('list')
    @HttpCode(200)
    list(){
        return this.reviewService.list();
    }
}
