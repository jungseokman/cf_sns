import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { PostsService } from './posts.service';

interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

let posts: PostModel[] = [
  {
    id: 1,
    author: 'test',
    title: 'My second Post',
    content: 'This is my second post',
    likeCount: 200000,
    commentCount: 130000,
  },
  {
    id: 2,
    author: 'qweeee',
    title: 'My t Post',
    content: 'This is my t post',
    likeCount: 44234234,
    commentCount: 2344234,
  },
  {
    id: 3,
    author: 'hhdfgdfg',
    title: 'My third Post',
    content: 'This is my third post',
    likeCount: 1321312,
    commentCount: 213333,
  },
];

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts(): PostModel[] {
    return posts;
  }

  @Get(':id')
  getPost(@Param('id') id: string): PostModel {
    const post = posts.find((post) => post.id === parseInt(id));
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }
}
