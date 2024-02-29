import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes, HttpCode, HttpStatus, Logger, InternalServerErrorException, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }
  private readonly logger = new Logger(UserController.name)

  @Post()
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.userService.create(createUserDto);

      if (!newUser) {
        throw new InternalServerErrorException()
      }

      this.logger.log(newUser)

      return { statusCode: HttpStatus.CREATED, message: "User successfully created", data: newUser };

    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException()
    }

  }

  @Get()
  public async asyncfindAll() {
    try {

      const users = await this.userService.findAll();

      this.logger.log(users)

      return { statusCode: HttpStatus.OK, data: users };

    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException()
    }
  }

  @Get(':id')
  public async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const user = await this.userService.findOne(id)

      if (!user) {
        throw new NotFoundException('User does not exist');
      }
      this.logger.log(user)

      return { statusCode: HttpStatus.OK, data: user };

    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException()
    }



  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    // return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
