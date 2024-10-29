import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PaymentMethod } from '../users/persistance/enums/paymentMethod';
import { AreaSocial } from './enums/area-social';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post(':id')
  create(@Param('id') id: number, @Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto,id);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get('area/:area')
  findAllByArea(@Param('area') area: string) {
    const areaSocial = area as AreaSocial;
    return this.postsService.findAllByArea(areaSocial);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.postsService.findOne(+id);
  }




}
