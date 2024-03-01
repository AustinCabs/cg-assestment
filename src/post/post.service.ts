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

    if (!user)
    throw new HttpException(
      'User not found. Cannot create Profile',
      HttpStatus.BAD_REQUEST,
    );

    const newPost = await this.postRepository.create({
      ...input,
      user
    })

    return this.postRepository.save(newPost)
  }

  findAll() {
    return `This action returns all post`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
