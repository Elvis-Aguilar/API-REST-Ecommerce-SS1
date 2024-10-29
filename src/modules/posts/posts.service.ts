import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { AreaSocial } from './enums/area-social';

@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>
  ) {
  }

  // Método para crear un nuevo post
  async create(createPostDto: CreatePostDto, userId: number): Promise<Post> {
    const newPost = this.postRepository.create({
      ...createPostDto,
      user: { id: userId }
    });

    return await this.postRepository.save(newPost);
  }

  async findAll(): Promise<Post[]> {
    return await this.postRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return post;
  }

  // Método para obtener todos los posts de un área específica
  async findAllByArea(area: AreaSocial): Promise<Post[]> {
    const posts = await this.postRepository.find({
      where: { area_social: area },
      relations: ['user'],
    });

    return posts;
  }

}
