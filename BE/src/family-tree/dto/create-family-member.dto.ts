import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsDateString, IsNumber, IsArray, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFamilyMemberDto {
  @ApiProperty({
    description: 'Họ và tên đầy đủ',
    example: 'Nguyễn Văn A',
  })
  @IsNotEmpty({ message: 'Họ tên không được để trống' })
  @IsString()
  fullName: string;

  @ApiProperty({
    description: 'Biệt danh (nếu có)',
    example: 'Tí',
    required: false,
  })
  @IsOptional()
  @IsString()
  nickname?: string;

  @ApiProperty({
    description: 'Giới tính',
    example: 'MALE',
    enum: ['MALE', 'FEMALE', 'OTHER'],
    default: 'MALE',
  })
  @IsEnum(['MALE', 'FEMALE', 'OTHER'], { message: 'Giới tính phải là MALE, FEMALE hoặc OTHER' })
  gender: string;

  @ApiProperty({
    description: 'Ngày sinh (dương lịch)',
    example: '1990-01-01',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @ApiProperty({
    description: 'Ngày sinh (âm lịch)',
    example: '01/01/Canh Ngọ',
    required: false,
  })
  @IsOptional()
  @IsString()
  lunarDateOfBirth?: string;

  @ApiProperty({
    description: 'Ngày mất (dương lịch)',
    example: '2023-01-01',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  dateOfDeath?: string;

  @ApiProperty({
    description: 'Ngày mất (âm lịch)',
    example: '01/01/Quý Mão',
    required: false,
  })
  @IsOptional()
  @IsString()
  lunarDateOfDeath?: string;

  @ApiProperty({
    description: 'Quê quán',
    example: 'Hà Nội',
    required: false,
  })
  @IsOptional()
  @IsString()
  hometown?: string;

  @ApiProperty({
    description: 'ID của cha',
    example: '60d5f8b9e8f9a95dcccfb111',
    required: false,
  })
  @IsOptional()
  @IsMongoId()
  fatherId?: string;

  @ApiProperty({
    description: 'ID của mẹ',
    example: '60d5f8b9e8f9a95dcccfb222',
    required: false,
  })
  @IsOptional()
  @IsMongoId()
  motherId?: string;

  @ApiProperty({
    description: 'IDs của vợ/chồng',
    example: ['60d5f8b9e8f9a95dcccfb333'],
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  spouseIds?: string[];

  @ApiProperty({
    description: 'Đời thứ',
    example: 3,
  })
  @IsNumber()
  @Type(() => Number)
  generation: number;

  @ApiProperty({
    description: 'Tiểu sử',
    example: 'Sinh ra và lớn lên tại Hà Nội...',
    required: false,
  })
  @IsOptional()
  @IsString()
  biography?: string;

  @ApiProperty({
    description: 'URL ảnh đại diện',
    example: 'https://example.com/avatar.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiProperty({
    description: 'Danh sách URL ảnh khác',
    example: ['https://example.com/photo1.jpg', 'https://example.com/photo2.jpg'],
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  photoUrls?: string[];

  @ApiProperty({
    description: 'User ID liên kết (nếu có)',
    example: '60d5f8b9e8f9a95dcccfb444',
    required: false,
  })
  @IsOptional()
  @IsMongoId()
  userId?: string;

  @ApiProperty({
    description: 'Ghi chú thêm',
    example: 'Thông tin bổ sung...',
    required: false,
  })
  @IsOptional()
  @IsString()
  notes?: string;
} 