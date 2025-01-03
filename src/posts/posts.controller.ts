import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
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
    return posts.find((post) => post.id === parseInt(id));
  }

  @Post()
  createPost(
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ): PostModel {
    const post: PostModel = {
      id: posts[posts.length - 1].id + 1,
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    };
    posts.push(post);
    return post;
  }

  @Put(':id')
  updatePost(
    @Param('id') id: string,
    @Body('title') title?: string,
    @Body('content') content?: string,
    @Body('author') author?: string,
  ): PostModel {
    const post = posts.find((post) => post.id === parseInt(id));
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    console.log(`1 => ${post.content}`);

    if (title) post.title = title;
    console.log(`2 => ${post.content}`);
    if (content) post.content = content;
    console.log(`3 => ${post.content}`);
    if (author) post.author = author;
    console.log(`4 => ${post.content}`);

    posts.map((prevPost) => {
      if (prevPost.id === parseInt(id)) {
        return post;
      }
      return prevPost;
    });

    return post;
  }

  @Delete(':id')
  deletePost(@Param('id') id: string): PostModel {
    const post = posts.find((post) => post.id === parseInt(id));
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    posts = posts.filter((post) => post.id !== parseInt(id));
    return post;
  }
}
