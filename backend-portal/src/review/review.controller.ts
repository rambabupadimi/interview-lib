import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { UserJwtGuard } from '../auth/guard';
import { ReviewService } from './review.service';
import {GetUser} from '../auth/decorator';
import { createReviewDto, updateReviewDto } from './dto/review.dto';
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

    @Put('update')
    @HttpCode(200)
    // @Roles("ADMIN")
    update(@Body() body: updateReviewDto) {
      return this.reviewService.update(body);
    }

    @Delete('delete/:id')
    @HttpCode(200)
    // @Roles("ADMIN")
    delete(@Param("id", ParseIntPipe) id: number){
        return this.reviewService.delete(id);
    }

    @Get('list')
    @HttpCode(200)
    list(){
        return this.reviewService.list();
    }
}
