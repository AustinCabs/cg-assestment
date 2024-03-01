import { Controller, Get, Post, Body, Param, Delete, Logger, UsePipes, ValidationPipe, ParseIntPipe, HttpStatus, Put, InternalServerErrorException, Query, Res } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) { }
  private readonly logger = new Logger(PostController.name)

  @Get()
  public async findAll(@Query() query) {
    this.logger.log(JSON.stringify(query))

    if (typeof query.author !== 'undefined'
      && typeof query.page === 'undefined'
      && typeof query.take === 'undefined') {
      this.logger.warn("search author works")
      const filterByName = await this.postService.getPostOfUserByName(query.author);
      return { statusCode: HttpStatus.OK, data: filterByName };
    }

    if (typeof query.author === 'undefined'
      && typeof query.page !== 'undefined'
      && typeof query.take !== 'undefined') {
      this.logger.warn("Paginate works")
      const paginatedData = await this.postService.getPaginatePost({ page: query.page, take: query.take })
      console.log('# paginate', paginatedData)
      const { data, previousPage, currentPage, totalPages, count, nextPage, } = paginatedData
      return {
        statusCode: HttpStatus.OK,
        currentPage,
        previousPage,
        nextPage,
        totalPages,
        count,
        data
      };
    }

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

  @Put(':id')
  public async update(@Param('id', ParseIntPipe) id: number, @Body() updatePostDto: UpdatePostDto) {
    const updatePost = this.postService.update(id, updatePostDto);
    this.logger.log(JSON.stringify(updatePost))
    return { statusCode: HttpStatus.OK, message: "Post successfully update" };
  }

  @Delete(':id')
  public async remove(@Param('id', ParseIntPipe) id: number) {
    const deleteUser = await this.postService.remove(id)

    if (!deleteUser) {
      throw new InternalServerErrorException()
    }

    return { statusCode: HttpStatus.OK, message: "User successfully deleted" };
  }
}
