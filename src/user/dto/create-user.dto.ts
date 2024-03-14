import { IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  username: string

  @MinLength(6)
  @IsNotEmpty()
  password: string
}
