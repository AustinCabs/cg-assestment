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

      if (!user) {
        throw new NotFoundException('User does not exist');
      }
      this.logger.log(user)

      return { statusCode: HttpStatus.OK, data: user };
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
      const user = await this.userService.findOne(id)

      if (!user) {
        throw new NotFoundException('User does not exist');
      }

      const updateUser = await this.userService.update(updateUserDto)

      if (!updateUser) {
        throw new InternalServerErrorException()
      }

      return { statusCode: HttpStatus.OK, message: "User successfully updated" };
  }

  @Delete(':id')
  public async remove(@Param('id', ParseIntPipe) id: number) {
      const user = await this.userService.findOne(id)

      if (!user) {
        throw new NotFoundException('User does not exist');
      }

      const deleteUser = await this.userService.remove(id)

      if (!deleteUser) {
        throw new InternalServerErrorException()
      }

      return { statusCode: HttpStatus.OK, message: "User successfully deleted" };
  }
}
