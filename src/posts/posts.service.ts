import { Injectable } from '@nestjs/common';

export interface PostModel {
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

@Injectable()
export class PostsService {
  getAllPosts(): PostModel[] {
    return posts;
  }

  getPostById(id: number): PostModel {
    return posts.find((post) => post.id === id);
  }

  createPost(author: string, title: string, content: string) {
    const post: PostModel = {
      id: posts.length + 1,
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    };
    posts.push(post);
    return post;
  }

  updatePost(
    id: number,
    author: string,
    title: string,
    content: string,
  ): PostModel {
    const index = posts.findIndex((post) => post.id === id);
    posts[index] = {
      id,
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    };
    return posts[index];
  }

  deletePost(id: number): PostModel {
    const index = posts.findIndex((post) => post.id === id);
    const post = posts[index];
    posts.splice(index, 1);
    return post;
  }
}
