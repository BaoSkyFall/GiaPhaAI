import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { Permission } from './schema/permission.schema';

@ApiTags('Permissions')
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Tạo mới quyền' })
  @ApiResponse({ status: 201, description: 'Quyền được tạo thành công.' })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ.' })
  @ApiResponse({ status: 409, description: 'Quyền đã tồn tại.' })
  create(@Body() createPermissionDto: CreatePermissionDto, @Req() req): Promise<Permission> {
    return this.permissionsService.create(createPermissionDto, req.user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Lấy danh sách quyền' })
  @ApiResponse({ status: 200, description: 'Trả về danh sách quyền.' })
  findAll(
    @Query('current') currentPage: string = '1',
    @Query('pageSize') limit: string = '10',
    @Query() query: any,
  ): Promise<{ meta: any; result: Permission[] }> {
    return this.permissionsService.findAll(+currentPage, +limit, query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Lấy thông tin quyền theo ID' })
  @ApiResponse({ status: 200, description: 'Trả về thông tin quyền.' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy quyền.' })
  findOne(@Param('id') id: string): Promise<Permission> {
    return this.permissionsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Cập nhật thông tin quyền' })
  @ApiResponse({ status: 200, description: 'Quyền được cập nhật thành công.' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy quyền.' })
  update(
    @Param('id') id: string, 
    @Body() updatePermissionDto: UpdatePermissionDto,
    @Req() req,
  ): Promise<Permission> {
    return this.permissionsService.update(id, updatePermissionDto, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Xóa quyền' })
  @ApiResponse({ status: 200, description: 'Quyền được xóa thành công.' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy quyền.' })
  remove(@Param('id') id: string, @Req() req): Promise<Permission> {
    return this.permissionsService.remove(id, req.user);
  }
} 