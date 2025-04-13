import { PartialType } from '@nestjs/mapped-types';
import { CreateFamilyMemberDto } from './create-family-member.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateFamilyMemberDto extends PartialType(CreateFamilyMemberDto) {
  @ApiProperty({
    description: 'Trạng thái hoạt động của thành viên',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
} 