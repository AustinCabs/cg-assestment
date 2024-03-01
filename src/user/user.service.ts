import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  public async create(input: CreateUserDto): Promise<User> {
    return await this.userRepository.save(input)
  }

  public async findAll() {
    return await this.userRepository.find();
  }

  public async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id
      }
    })

    if (!user)
      throw new HttpException(
        'User does not exist',
        HttpStatus.BAD_REQUEST,
      );

    return user
  }

  public async getUserPosts(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id
      },
      relations: ['posts']
    })

    if (!user)
      throw new HttpException(
        'User does not exist',
        HttpStatus.BAD_REQUEST,
      );

    return user
  }

  public async update(id: number, input: UpdateUserDto) {
    const user = await this.findOne(id)

    if (!user) {
      throw new InternalServerErrorException()
    }

    const mergeUser = this.userRepository.merge(user, input)

    return this.userRepository.save(mergeUser)
  }

  public async remove(id: number) {
    const user = await this.findOne(id)

    if (!user) {
      throw new InternalServerErrorException()
    }

    return await this.userRepository.delete(id)
  }
}
