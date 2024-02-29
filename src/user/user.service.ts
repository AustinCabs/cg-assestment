import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
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
    return this.userRepository.find();
  }

  public async findOne(id: number) {
    return this.userRepository.findOne({
      where: {
        id
      }
    })
  }

  update(id: number) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
