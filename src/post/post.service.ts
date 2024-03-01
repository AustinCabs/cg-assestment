import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm'
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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

  public async findAll() {
    return this.postRepository.find()
  }

  public async findOne(id: number) {
    const post = await this.postRepository.findOne({
      where: {
        id
      }
    })

    if (!post)
      throw new HttpException(
        'Post does not exist',
        HttpStatus.BAD_REQUEST,
      );

    return post
  }

  public async getPostOfUserByName(name: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.posts', 'post')
      .where('user.name = :name', { name })
      .getMany();
  }

  public async update(id: number, input: UpdatePostDto) {
    const post = await this.findOne(id)

    if (!post) {
      throw new InternalServerErrorException()
    }

    const mergePost = this.postRepository.merge(post, input)

    return this.postRepository.save(mergePost)
  }

  public async remove(id: number) {
    const post = await this.findOne(id)

    if (!post) {
      throw new InternalServerErrorException()
    }

    return await this.postRepository.delete(id)
  }
}
