import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type FamilyMemberDocument = FamilyMember & Document;

@Schema({
  timestamps: true,
  collection: 'family_members',
})
export class FamilyMember {
  @ApiProperty({ description: 'ID của thành viên gia phả' })
  _id: Types.ObjectId;

  @ApiProperty({ description: 'Họ và tên đầy đủ' })
  @Prop({ required: true })
  fullName: string;

  @ApiProperty({ description: 'Biệt danh (nếu có)' })
  @Prop()
  nickname: string;

  @ApiProperty({ description: 'Giới tính' })
  @Prop({ enum: ['MALE', 'FEMALE', 'OTHER'], default: 'MALE' })
  gender: string;

  @ApiProperty({ description: 'Ngày sinh (dương lịch)' })
  @Prop()
  dateOfBirth: Date;

  @ApiProperty({ description: 'Ngày sinh (âm lịch)' })
  @Prop()
  lunarDateOfBirth: string;

  @ApiProperty({ description: 'Ngày mất (dương lịch)', required: false })
  @Prop()
  dateOfDeath: Date;

  @ApiProperty({ description: 'Ngày mất (âm lịch)', required: false })
  @Prop()
  lunarDateOfDeath: string;

  @ApiProperty({ description: 'Quê quán' })
  @Prop()
  hometown: string;

  @ApiProperty({ description: 'ID của cha' })
  @Prop({ type: Types.ObjectId, ref: 'FamilyMember' })
  fatherId: Types.ObjectId;

  @ApiProperty({ description: 'ID của mẹ' })
  @Prop({ type: Types.ObjectId, ref: 'FamilyMember' })
  motherId: Types.ObjectId;

  @ApiProperty({ description: 'ID của vợ/chồng' })
  @Prop({ type: [{ type: Types.ObjectId, ref: 'FamilyMember' }] })
  spouseIds: Types.ObjectId[];

  @ApiProperty({ description: 'Đời thứ' })
  @Prop({ required: true })
  generation: number;

  @ApiProperty({ description: 'Tiểu sử' })
  @Prop()
  biography: string;

  @ApiProperty({ description: 'URL ảnh đại diện' })
  @Prop()
  avatarUrl: string;

  @ApiProperty({ description: 'Danh sách URL ảnh khác' })
  @Prop({ type: [String] })
  photoUrls: string[];

  @ApiProperty({ description: 'User ID được liên kết (nếu có)' })
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @ApiProperty({ description: 'Ghi chú khác' })
  @Prop()
  notes: string;

  @ApiProperty({ description: 'Trạng thái hoạt động' })
  @Prop({ default: true })
  isActive: boolean;

  @ApiProperty({ description: 'Người tạo' })
  @Prop({ type: Object })
  createdBy: {
    _id: Types.ObjectId;
    email: string;
  };

  @ApiProperty({ description: 'Người cập nhật gần nhất' })
  @Prop({ type: Object })
  updatedBy: {
    _id: Types.ObjectId;
    email: string;
  };

  @ApiProperty({ description: 'Ngày tạo' })
  @Prop()
  createdAt: Date;

  @ApiProperty({ description: 'Ngày cập nhật' })
  @Prop()
  updatedAt: Date;
}

export const FamilyMemberSchema = SchemaFactory.createForClass(FamilyMember); 