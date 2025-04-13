import { ApiProperty } from '@nestjs/swagger';
import { 
  IsNotEmpty, IsString, IsOptional, IsArray, 
  IsEnum, IsBoolean, IsDateString, IsUrl 
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateBlogPostDto {
  @ApiProperty({
    description: 'Tiêu đề bài viết',
    example: 'Lễ giỗ tổ họ Nguyễn năm 2023',
  })
  @IsNotEmpty({ message: 'Tiêu đề không được để trống' })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Slug URL của bài viết (tạo tự động nếu để trống)',
    example: 'le-gio-to-ho-nguyen-nam-2023',
    required: false,
  })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({
    description: 'Mô tả ngắn',
    example: 'Thông tin về lễ giỗ tổ họ Nguyễn sẽ diễn ra vào ngày 15/8 âm lịch...',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Nội dung đầy đủ của bài viết',
    example: '# Lễ giỗ tổ họ Nguyễn\n\nLễ giỗ tổ sẽ được tổ chức vào ngày 15 tháng 8 năm 2023...',
  })
  @IsNotEmpty({ message: 'Nội dung không được để trống' })
  @IsString()
  content: string;

  @ApiProperty({
    description: 'URL ảnh thumbnail',
    example: 'https://example.com/images/le-gio-to.jpg',
    required: false,
  })
  @IsOptional()
  @IsUrl({}, { message: 'URL thumbnail không hợp lệ' })
  thumbnailUrl?: string;

  @ApiProperty({
    description: 'Tags/chủ đề của bài viết',
    example: ['lễ giỗ', 'truyền thống', 'họ Nguyễn'],
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiProperty({
    description: 'Danh mục của bài viết',
    example: 'EVENT',
    enum: ['NEWS', 'EVENT', 'HISTORY', 'CULTURE', 'OTHER'],
    default: 'NEWS',
  })
  @IsEnum(['NEWS', 'EVENT', 'HISTORY', 'CULTURE', 'OTHER'], { 
    message: 'Danh mục phải là một trong các giá trị: NEWS, EVENT, HISTORY, CULTURE, OTHER'
  })
  category: string;

  @ApiProperty({
    description: 'Bài viết nổi bật',
    example: false,
    required: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  isFeatured?: boolean;

  @ApiProperty({
    description: 'Trạng thái công khai',
    example: 'DRAFT',
    enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'],
    default: 'DRAFT',
  })
  @IsEnum(['DRAFT', 'PUBLISHED', 'ARCHIVED'], { 
    message: 'Trạng thái phải là một trong các giá trị: DRAFT, PUBLISHED, ARCHIVED' 
  })
  status: string;

  @ApiProperty({
    description: 'Ngày công khai bài viết',
    example: '2023-08-15T08:00:00Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  publishedAt?: string;

  @ApiProperty({
    description: 'Những ngày quan trọng liên quan đến bài viết',
    example: ['2023-08-15T08:00:00Z'],
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsDateString({}, { each: true })
  importantDates?: string[];
} 