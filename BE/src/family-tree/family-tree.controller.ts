import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { FamilyTreeService } from './family-tree.service';
import { CreateFamilyMemberDto } from './dto/create-family-member.dto';
import { UpdateFamilyMemberDto } from './dto/update-family-member.dto';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { FamilyMember } from './schemas/family-member.schema';

@ApiTags('Family Tree')
@Controller('family-tree/members')
export class FamilyTreeController {
  constructor(private readonly familyTreeService: FamilyTreeService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Tạo mới thành viên gia phả' })
  @ApiResponse({ status: 201, description: 'Thành viên được tạo thành công.' })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ.' })
  create(@Body() createFamilyMemberDto: CreateFamilyMemberDto, @Req() req): Promise<FamilyMember> {
    return this.familyTreeService.create(createFamilyMemberDto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách thành viên gia phả' })
  @ApiResponse({ status: 200, description: 'Trả về danh sách thành viên.' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Số lượng kết quả tối đa' })
  @ApiQuery({ name: 'skip', required: false, type: Number, description: 'Số lượng kết quả bỏ qua' })
  @ApiQuery({ name: 'generation', required: false, type: Number, description: 'Lọc theo đời' })
  @ApiQuery({ name: 'gender', required: false, enum: ['MALE', 'FEMALE', 'OTHER'], description: 'Lọc theo giới tính' })
  findAll(@Query() query): Promise<FamilyMember[]> {
    return this.familyTreeService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin thành viên gia phả theo ID' })
  @ApiResponse({ status: 200, description: 'Trả về thông tin thành viên.' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy thành viên.' })
  findOne(@Param('id') id: string): Promise<FamilyMember> {
    return this.familyTreeService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Cập nhật thông tin thành viên gia phả' })
  @ApiResponse({ status: 200, description: 'Thành viên được cập nhật thành công.' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy thành viên.' })
  update(
    @Param('id') id: string, 
    @Body() updateFamilyMemberDto: UpdateFamilyMemberDto,
    @Req() req
  ): Promise<FamilyMember> {
    return this.familyTreeService.update(id, updateFamilyMemberDto, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Xóa thành viên gia phả' })
  @ApiResponse({ status: 200, description: 'Thành viên được xóa thành công.' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy thành viên.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.familyTreeService.remove(id);
  }

  @Get(':id/children')
  @ApiOperation({ summary: 'Lấy danh sách con của thành viên' })
  @ApiResponse({ status: 200, description: 'Trả về danh sách con.' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy thành viên.' })
  getChildren(@Param('id') id: string): Promise<FamilyMember[]> {
    return this.familyTreeService.getChildren(id);
  }

  @Get(':id/spouses')
  @ApiOperation({ summary: 'Lấy danh sách vợ/chồng của thành viên' })
  @ApiResponse({ status: 200, description: 'Trả về danh sách vợ/chồng.' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy thành viên.' })
  getSpouses(@Param('id') id: string): Promise<FamilyMember[]> {
    return this.familyTreeService.getSpouses(id);
  }

  @Get(':id/ancestors')
  @ApiOperation({ summary: 'Lấy danh sách tổ tiên của thành viên' })
  @ApiResponse({ status: 200, description: 'Trả về danh sách tổ tiên.' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy thành viên.' })
  @ApiQuery({ name: 'generations', required: false, type: Number, description: 'Số đời tổ tiên muốn lấy (mặc định: 3)' })
  getAncestors(
    @Param('id') id: string,
    @Query('generations') generations?: number
  ): Promise<FamilyMember[]> {
    return this.familyTreeService.getAncestors(id, generations);
  }

  @Get('generation/:gen')
  @ApiOperation({ summary: 'Lấy danh sách thành viên theo đời' })
  @ApiResponse({ status: 200, description: 'Trả về danh sách thành viên.' })
  getByGeneration(@Param('gen') generation: number): Promise<FamilyMember[]> {
    return this.familyTreeService.getByGeneration(generation);
  }

  @Get('search/query')
  @ApiOperation({ summary: 'Tìm kiếm thành viên gia phả' })
  @ApiResponse({ status: 200, description: 'Trả về danh sách thành viên phù hợp.' })
  @ApiQuery({ name: 'q', required: true, type: String, description: 'Từ khóa tìm kiếm' })
  search(@Query('q') query: string): Promise<FamilyMember[]> {
    return this.familyTreeService.search(query);
  }
} 