import { IsArray, IsBoolean, IsMongoId, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class CreateRoleDto {
  @IsNotEmpty({
    message: 'Tên Role không được để trống',
  })
  name: string;

  @IsNotEmpty({
    message: 'Mô tả không được để trống',
  })
  description: string;

  @IsNotEmpty({
    message: 'Active không được để trống',
  })
  @IsBoolean({
    message: 'Active không phải là giá trị Boolean',
  })
  isActive: string;

  @IsNotEmpty({
    message: 'Permissions không được để trống',
  })
  @IsArray({
    message: 'Permissions phải là một mảng',
  })
  @IsMongoId({
    each: true,
    message: 'Mỗi permission phải là MongoDB ObjectId hợp lệ',
  })
  permissions: mongoose.Schema.Types.ObjectId[];
}
