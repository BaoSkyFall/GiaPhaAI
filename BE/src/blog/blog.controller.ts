import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { BlogService } from './blog.service';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { BlogPost } from './schemas/blog-post.schema';

@ApiTags('Blog')
@Controller('blog/posts')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Tạo mới bài viết' })
  @ApiResponse({ status: 201, description: 'Bài viết được tạo thành công.' })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ.' })
  create(@Body() createBlogPostDto: CreateBlogPostDto, @Req() req): Promise<BlogPost> {
    return this.blogService.create(createBlogPostDto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách bài viết' })
  @ApiResponse({ status: 200, description: 'Trả về danh sách bài viết.' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Số lượng kết quả tối đa' })
  @ApiQuery({ name: 'skip', required: false, type: Number, description: 'Số lượng kết quả bỏ qua' })
  @ApiQuery({ name: 'status', required: false, enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'], description: 'Lọc theo trạng thái' })
  @ApiQuery({ name: 'category', required: false, enum: ['NEWS', 'EVENT', 'HISTORY', 'CULTURE', 'OTHER'], description: 'Lọc theo danh mục' })
  @ApiQuery({ name: 'tag', required: false, type: String, description: 'Lọc theo tag' })
  @ApiQuery({ name: 'search', required: false, type: String, description: 'Tìm kiếm theo nội dung/tiêu đề' })
  @ApiQuery({ name: 'sort', required: false, type: String, description: 'Trường để sắp xếp' })
  @ApiQuery({ name: 'order', required: false, enum: ['asc', 'desc'], description: 'Thứ tự sắp xếp' })
  @ApiQuery({ name: 'featured', required: false, type: Boolean, description: 'Lọc bài viết nổi bật' })
  findAll(@Query() query): Promise<BlogPost[]> {
    return this.blogService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin bài viết theo ID hoặc slug' })
  @ApiResponse({ status: 200, description: 'Trả về thông tin bài viết.' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy bài viết.' })
  findOne(@Param('id') id: string): Promise<BlogPost> {
    return this.blogService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Cập nhật thông tin bài viết' })
  @ApiResponse({ status: 200, description: 'Bài viết được cập nhật thành công.' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy bài viết.' })
  update(
    @Param('id') id: string, 
    @Body() updateBlogPostDto: UpdateBlogPostDto,
    @Req() req
  ): Promise<BlogPost> {
    return this.blogService.update(id, updateBlogPostDto, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Xóa bài viết' })
  @ApiResponse({ status: 200, description: 'Bài viết được xóa thành công.' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy bài viết.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.blogService.remove(id);
  }

  @Post(':id/view')
  @ApiOperation({ summary: 'Tăng lượt xem cho bài viết' })
  @ApiResponse({ status: 200, description: 'Lượt xem đã được tăng.' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy bài viết.' })
  incrementViewCount(@Param('id') id: string): Promise<void> {
    return this.blogService.incrementViewCount(id);
  }

  @Get('tag/:tag')
  @ApiOperation({ summary: 'Lấy danh sách bài viết theo tag' })
  @ApiResponse({ status: 200, description: 'Trả về danh sách bài viết.' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Số lượng kết quả tối đa' })
  findByTag(@Param('tag') tag: string, @Query('limit') limit: number = 5): Promise<BlogPost[]> {
    return this.blogService.findByTags([tag], limit);
  }

  @Get('featured/list')
  @ApiOperation({ summary: 'Lấy danh sách bài viết nổi bật' })
  @ApiResponse({ status: 200, description: 'Trả về danh sách bài viết nổi bật.' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Số lượng kết quả tối đa' })
  findFeatured(@Query('limit') limit: number = 5): Promise<BlogPost[]> {
    return this.blogService.findFeatured(limit);
  }

  @Get('categories/list')
  @ApiOperation({ summary: 'Lấy danh sách các danh mục' })
  @ApiResponse({ status: 200, description: 'Trả về danh sách danh mục.' })
  getCategories(): Promise<string[]> {
    return this.blogService.getCategories();
  }

  @Get('tags/list')
  @ApiOperation({ summary: 'Lấy danh sách các tag' })
  @ApiResponse({ status: 200, description: 'Trả về danh sách tag.' })
  getTags(): Promise<string[]> {
    return this.blogService.getTags();
  }
} 