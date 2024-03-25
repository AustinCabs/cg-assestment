import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";

@Resolver(() => 'User')
export class UsersResolver {
  constructor (
    private readonly userService: UserService
  ) {}

  @Query()
  async getTestUser() {
    return {
      id: 1,
      username: 'austin_test',
      password: '12wdaf2ewdfawewweg',
      name: 'austin cabanada'
    }
  }

  @Query()
  async getUsers() {
    return this.userService.findAll()
  }

  @Mutation()
  @UsePipes(new ValidationPipe())
  async createUser(@Args('input') input: CreateUserDto) {
    return await this.userService.create(input);
  }

}
