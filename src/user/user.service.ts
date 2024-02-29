import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

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
    return await this.userRepository.findOne({
      where: {
        id
      }
    })
  }

  public async update(input: UpdateUserDto) {
    return await this.userRepository.save(input)
  }

  public async  remove(id: number) {
    return await this.userRepository.delete(id)
  }
}
