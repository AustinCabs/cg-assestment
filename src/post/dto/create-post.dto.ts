import { IsNotEmpty, IsNumberString } from "class-validator"

export class CreatePostDto {
  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  content: string

  @IsNotEmpty()
  @IsNumberString()
  userId: number
}
