import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostModel, PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts() {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  getPost(@Param('id') id: string): PostModel {
    return this.postsService.getPostById(parseInt(id));
  }

  @Post()
  createPost(
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ): PostModel {
    return this.postsService.createPost(author, title, content);
  }

  @Put(':id')
  updatePost(
    @Param('id') id: string,
    @Body('title') title?: string,
    @Body('content') content?: string,
    @Body('author') author?: string,
  ): PostModel {
    return this.postsService.updatePost(parseInt(id), author, title, content);
  }

  @Delete(':id')
  deletePost(@Param('id') id: string): PostModel {
    return this.postsService.deletePost(parseInt(id));
  }
}
