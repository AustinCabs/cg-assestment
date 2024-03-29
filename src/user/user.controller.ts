import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes, HttpCode, HttpStatus, Logger, InternalServerErrorException, ParseIntPipe, NotFoundException, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }
  private readonly logger = new Logger(UserController.name)

  @Get()
  public async asyncfindAll() {
    const users = await this.userService.findAll();

    this.logger.log(users)

    return { statusCode: HttpStatus.OK, data: users };
  }

  @Get(':id')
  public async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findOne(id)

    this.logger.log(JSON.stringify(user))

    return { statusCode: HttpStatus.OK, data: user };
  }

  @Get(':id/posts')
  public async getUserPosts(@Param('id', ParseIntPipe) id: number) {
    const userPosts = await this.userService.getUserPosts(id)
    return { statusCode: HttpStatus.OK, data: userPosts };
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.userService.create(createUserDto);

    if (!newUser) {
      throw new InternalServerErrorException()
    }

    this.logger.log(newUser)

    return { statusCode: HttpStatus.CREATED, message: "User successfully created", data: newUser };

  }

  @Patch(':id')
  public async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    const updateUser = await this.userService.update(id, updateUserDto)

    if (!updateUser) {
      throw new InternalServerErrorException()
    }

    return { statusCode: HttpStatus.OK, message: "User successfully updated" };
  }

  @Delete(':id')
  public async remove(@Param('id', ParseIntPipe) id: number) {
    const deleteUser = await this.userService.remove(id)

    if (!deleteUser) {
      throw new InternalServerErrorException()
    }

    return { statusCode: HttpStatus.OK, message: "User successfully deleted" };
  }
}
