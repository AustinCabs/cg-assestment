import { IsAlphanumeric, IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @IsAlphanumeric()
  @IsNotEmpty()
  name: string
}
