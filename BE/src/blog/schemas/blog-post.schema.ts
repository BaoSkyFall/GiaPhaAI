import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type BlogPostDocument = BlogPost & Document;

@Schema({
  timestamps: true,
  collection: 'blog_posts',
})
export class BlogPost {
  @ApiProperty({ description: 'ID của bài viết' })
  _id: Types.ObjectId;

  @ApiProperty({ description: 'Tiêu đề bài viết' })
  @Prop({ required: true })
  title: string;

  @ApiProperty({ description: 'Slug URL của bài viết' })
  @Prop({ required: true, unique: true })
  slug: string;

  @ApiProperty({ description: 'Mô tả ngắn' })
  @Prop()
  description: string;

  @ApiProperty({ description: 'Nội dung đầy đủ của bài viết' })
  @Prop({ required: true })
  content: string;

  @ApiProperty({ description: 'URL ảnh thumbnail' })
  @Prop()
  thumbnailUrl: string;

  @ApiProperty({ description: 'Tags/chủ đề của bài viết' })
  @Prop({ type: [String] })
  tags: string[];

  @ApiProperty({ description: 'Danh mục của bài viết' })
  @Prop({ enum: ['NEWS', 'EVENT', 'HISTORY', 'CULTURE', 'OTHER'], default: 'NEWS' })
  category: string;

  @ApiProperty({ description: 'Số lượt xem' })
  @Prop({ default: 0 })
  viewCount: number;

  @ApiProperty({ description: 'Bài viết nổi bật' })
  @Prop({ default: false })
  isFeatured: boolean;

  @ApiProperty({ description: 'Trạng thái công khai' })
  @Prop({ enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'], default: 'DRAFT' })
  status: string;

  @ApiProperty({ description: 'Ngày công khai bài viết' })
  @Prop()
  publishedAt: Date;

  @ApiProperty({ description: 'Những ngày quan trọng liên quan đến bài viết' })
  @Prop({ type: [Date] })
  importantDates: Date[];

  @ApiProperty({ description: 'Người tạo' })
  @Prop({ type: Object })
  createdBy: {
    _id: Types.ObjectId;
    email: string;
    fullName: string;
  };

  @ApiProperty({ description: 'Người cập nhật gần nhất' })
  @Prop({ type: Object })
  updatedBy: {
    _id: Types.ObjectId;
    email: string;
    fullName: string;
  };

  @ApiProperty({ description: 'Ngày tạo' })
  @Prop()
  createdAt: Date;

  @ApiProperty({ description: 'Ngày cập nhật' })
  @Prop()
  updatedAt: Date;
}

export const BlogPostSchema = SchemaFactory.createForClass(BlogPost); 