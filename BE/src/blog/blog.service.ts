import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BlogPost, BlogPostDocument } from './schemas/blog-post.schema';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import slugify from 'slugify';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(BlogPost.name) private blogPostModel: Model<BlogPostDocument>,
  ) {}

  async create(createBlogPostDto: CreateBlogPostDto, user: any): Promise<BlogPost> {
    let { slug } = createBlogPostDto;
    
    // Tạo slug tự động nếu không được cung cấp
    if (!slug) {
      slug = slugify(createBlogPostDto.title, { 
        lower: true, 
        strict: true, 
        locale: 'vi'
      });
    }
    
    // Kiểm tra slug đã tồn tại chưa
    const existingPost = await this.blogPostModel.findOne({ slug }).exec();
    if (existingPost) {
      throw new BadRequestException(`Slug "${slug}" đã tồn tại`);
    }
    
    // Set publishedAt nếu trạng thái là PUBLISHED
    let publishedAt = createBlogPostDto.publishedAt;
    if (createBlogPostDto.status === 'PUBLISHED' && !publishedAt) {
      publishedAt = new Date().toISOString();
    }
    
    const createdPost = new this.blogPostModel({
      ...createBlogPostDto,
      slug,
      publishedAt,
      createdBy: {
        _id: user.id,
        email: user.email,
        fullName: user.fullName || user.email,
      },
    });
    
    return createdPost.save();
  }

  async findAll(query: any = {}): Promise<BlogPost[]> {
    const { 
      limit = 10, 
      skip = 0, 
      status = 'PUBLISHED',
      category,
      tag,
      search,
      sort = 'publishedAt',
      order = 'desc',
      featured,
      ...filter 
    } = query;
    
    // Xây dựng filter
    const filterQuery: any = { ...filter };
    
    // Filter theo trạng thái
    if (status) {
      filterQuery.status = status;
    }
    
    // Filter theo danh mục
    if (category) {
      filterQuery.category = category;
    }
    
    // Filter theo tag
    if (tag) {
      filterQuery.tags = { $in: [tag] };
    }
    
    // Filter theo featured
    if (featured !== undefined) {
      filterQuery.isFeatured = featured === 'true' || featured === true;
    }
    
    // Tìm kiếm theo nội dung/tiêu đề
    if (search) {
      filterQuery.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }
    
    // Sắp xếp
    let sortOptions = {};
    if (sort) {
      sortOptions[sort] = order === 'desc' ? -1 : 1;
    }
    
    return this.blogPostModel
      .find(filterQuery)
      .limit(+limit)
      .skip(+skip)
      .sort(sortOptions)
      .exec();
  }

  async findOne(id: string): Promise<BlogPost> {
    let post: BlogPost;
    
    // Kiểm tra xem id có phải ObjectId không
    if (Types.ObjectId.isValid(id)) {
      post = await this.blogPostModel.findById(id).exec();
    } else {
      // Nếu không phải, coi id là slug
      post = await this.blogPostModel.findOne({ slug: id }).exec();
    }
    
    if (!post) {
      throw new NotFoundException('Không tìm thấy bài viết');
    }
    
    return post;
  }

  async update(id: string, updateBlogPostDto: UpdateBlogPostDto, user: any): Promise<BlogPost> {
    // Xử lý slug nếu được cung cấp
    if (updateBlogPostDto.slug) {
      const existingPost = await this.blogPostModel.findOne({ 
        slug: updateBlogPostDto.slug,
        _id: { $ne: id },
      }).exec();
      
      if (existingPost) {
        throw new BadRequestException(`Slug "${updateBlogPostDto.slug}" đã tồn tại`);
      }
    }
    
    // Xử lý publishedAt nếu trạng thái là PUBLISHED nhưng chưa có publishedAt
    if (updateBlogPostDto.status === 'PUBLISHED') {
      const post = await this.findOne(id);
      if (!post.publishedAt && !updateBlogPostDto.publishedAt) {
        updateBlogPostDto.publishedAt = new Date().toISOString();
      }
    }
    
    const updatedPost = await this.blogPostModel
      .findByIdAndUpdate(
        id,
        {
          ...updateBlogPostDto,
          updatedBy: {
            _id: user.id,
            email: user.email,
            fullName: user.fullName || user.email,
          },
        },
        { new: true },
      )
      .exec();
      
    if (!updatedPost) {
      throw new NotFoundException('Không tìm thấy bài viết');
    }
    
    return updatedPost;
  }

  async remove(id: string): Promise<void> {
    const result = await this.blogPostModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Không tìm thấy bài viết');
    }
  }

  async incrementViewCount(id: string): Promise<void> {
    const post = await this.findOne(id);
    await this.blogPostModel
      .findByIdAndUpdate(
        id,
        { $inc: { viewCount: 1 } },
      )
      .exec();
  }

  async findByTags(tags: string[], limit: number = 5): Promise<BlogPost[]> {
    return this.blogPostModel
      .find({
        tags: { $in: tags },
        status: 'PUBLISHED',
      })
      .limit(limit)
      .sort({ publishedAt: -1 })
      .exec();
  }

  async findFeatured(limit: number = 5): Promise<BlogPost[]> {
    return this.blogPostModel
      .find({
        isFeatured: true,
        status: 'PUBLISHED',
      })
      .limit(limit)
      .sort({ publishedAt: -1 })
      .exec();
  }

  async getCategories(): Promise<string[]> {
    const result = await this.blogPostModel.aggregate([
      { $match: { status: 'PUBLISHED' } },
      { $group: { _id: '$category' } },
      { $sort: { _id: 1 } },
    ]).exec();
    
    return result.map(item => item._id);
  }

  async getTags(): Promise<string[]> {
    const result = await this.blogPostModel.aggregate([
      { $match: { status: 'PUBLISHED' } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags' } },
      { $sort: { _id: 1 } },
    ]).exec();
    
    return result.map(item => item._id);
  }
} 