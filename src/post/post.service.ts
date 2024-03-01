import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm'
import { UserService } from 'src/user/user.service';
@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private userService: UserService
  ) { }

  public async create(input: CreatePostDto) {
    const user = await this.userService.findOne(input.userId)

    const newPost = await this.postRepository.create({
      ...input,
      user
    })

    return this.postRepository.save(newPost)
  }

  public async getPostByUserId(id: number) {

  }
  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
