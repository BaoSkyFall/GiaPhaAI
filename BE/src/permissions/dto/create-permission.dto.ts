import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty({
    description: 'Tên quyền',
    example: 'Tạo người dùng',
  })
  @IsNotEmpty({ message: 'Tên quyền không được để trống' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Đường dẫn API',
    example: '/api/v1/users',
  })
  @IsNotEmpty({ message: 'Đường dẫn API không được để trống' })
  @IsString()
  apiPath: string;

  @ApiProperty({
    description: 'Phương thức HTTP',
    example: 'POST',
    enum: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
  })
  @IsNotEmpty({ message: 'Phương thức không được để trống' })
  @IsEnum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], { 
    message: 'Phương thức phải là một trong các giá trị: GET, POST, PUT, PATCH, DELETE'
  })
  method: string;

  @ApiProperty({
    description: 'Module chức năng',
    example: 'USERS',
    enum: ['USERS', 'FAMILY_TREE', 'BLOG', 'FILES', 'NOTIFICATIONS', 'PERMISSIONS', 'ROLES', 'AUTH']
  })
  @IsNotEmpty({ message: 'Module không được để trống' })
  @IsString()
  module: string;
} 