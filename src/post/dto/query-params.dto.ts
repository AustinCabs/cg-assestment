import { IsNotEmpty } from "class-validator";

export class QueryAuthorName {
  @IsNotEmpty()
  author: string
}
