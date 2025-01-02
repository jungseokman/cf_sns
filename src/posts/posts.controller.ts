import { Controller, Get } from '@nestjs/common';
import { PostsService } from './posts.service';

interface Post {
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts(): Post {
    return {
      author: 'John Doe',
      title: 'My First Post',
      content: 'This is the content of my first post',
      likeCount: 10,
      commentCount: 5,
    };
  }
}
