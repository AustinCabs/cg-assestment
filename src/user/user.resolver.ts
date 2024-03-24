import { Query, Resolver } from "@nestjs/graphql";

@Resolver(() => 'User')
export class UsersResolver {

  @Query()
  async getUser() {
    return {
      id: 1,
      username:'austin_test',
      password: '12wdaf2ewdfawewweg',
      name: 'austin cabanada'
    }
  }
  
}
