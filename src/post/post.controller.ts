import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, UsePipes, ValidationPipe, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) { }
  private readonly logger = new Logger(PostController.name)

  @Get()
  public async findAll() {
    const posts = await this.postService.findAll();
    return { statusCode: HttpStatus.OK, data: posts };
  }

  @Get(':id')
  public async findById(@Param('id', ParseIntPipe) id: number) {
    const post = await this.postService.findOne(id);
    return { statusCode: HttpStatus.OK, data: post };
  }

  @Post()
  @UsePipes(new ValidationPipe())
  public async create(@Body() createPostDto: CreatePostDto) {
    const createdPost = await this.postService.create(createPostDto);
    const { user, ...rest } = createdPost
    return { statusCode: HttpStatus.CREATED, message: "Post successfully created", data: rest };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
