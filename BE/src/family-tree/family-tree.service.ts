import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { FamilyMember, FamilyMemberDocument } from './schemas/family-member.schema';
import { CreateFamilyMemberDto } from './dto/create-family-member.dto';
import { UpdateFamilyMemberDto } from './dto/update-family-member.dto';

@Injectable()
export class FamilyTreeService {
  constructor(
    @InjectModel(FamilyMember.name) private familyMemberModel: Model<FamilyMemberDocument>,
  ) {}

  async create(createFamilyMemberDto: CreateFamilyMemberDto, user: any): Promise<FamilyMember> {
    const createdMember = new this.familyMemberModel({
      ...createFamilyMemberDto,
      createdBy: {
        _id: user.id,
        email: user.email,
      },
    });
    return createdMember.save();
  }

  async findAll(query: any = {}): Promise<FamilyMember[]> {
    const { limit = 100, skip = 0, generation, gender, ...filter } = query;
    
    // Xây dựng filter
    const filterQuery: any = { ...filter };
    if (generation) filterQuery.generation = generation;
    if (gender) filterQuery.gender = gender;

    return this.familyMemberModel
      .find(filterQuery)
      .limit(+limit)
      .skip(+skip)
      .sort({ generation: 1, fullName: 1 })
      .exec();
  }

  async findOne(id: string): Promise<FamilyMember> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('ID không hợp lệ');
    }

    const member = await this.familyMemberModel.findById(id).exec();
    if (!member) {
      throw new NotFoundException('Không tìm thấy thành viên gia phả');
    }
    return member;
  }

  async update(id: string, updateFamilyMemberDto: UpdateFamilyMemberDto, user: any): Promise<FamilyMember> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('ID không hợp lệ');
    }

    const updatedMember = await this.familyMemberModel
      .findByIdAndUpdate(
        id,
        {
          ...updateFamilyMemberDto,
          updatedBy: {
            _id: user.id,
            email: user.email,
          },
        },
        { new: true },
      )
      .exec();

    if (!updatedMember) {
      throw new NotFoundException('Không tìm thấy thành viên gia phả');
    }

    return updatedMember;
  }

  async remove(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('ID không hợp lệ');
    }

    const result = await this.familyMemberModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Không tìm thấy thành viên gia phả');
    }
  }

  async getChildren(id: string): Promise<FamilyMember[]> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('ID không hợp lệ');
    }

    return this.familyMemberModel
      .find({ 
        $or: [
          { fatherId: new Types.ObjectId(id) },
          { motherId: new Types.ObjectId(id) }
        ]
      })
      .sort({ dateOfBirth: 1, fullName: 1 })
      .exec();
  }

  async getSpouses(id: string): Promise<FamilyMember[]> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('ID không hợp lệ');
    }

    const member = await this.findOne(id);
    if (!member.spouseIds || member.spouseIds.length === 0) {
      return [];
    }

    return this.familyMemberModel
      .find({ _id: { $in: member.spouseIds } })
      .exec();
  }

  async getAncestors(id: string, generations: number = 3): Promise<FamilyMember[]> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('ID không hợp lệ');
    }

    const member = await this.findOne(id);
    const ancestors: FamilyMember[] = [];
    
    // Lấy cha mẹ trực tiếp
    if (member.fatherId) {
      try {
        const father = await this.findOne(member.fatherId.toString());
        ancestors.push(father);
      } catch (error) {}
    }
    
    if (member.motherId) {
      try {
        const mother = await this.findOne(member.motherId.toString());
        ancestors.push(mother);
      } catch (error) {}
    }
    
    // Thực hiện đệ quy chỉ với số lượt giới hạn
    if (generations > 1) {
      for (const parent of [...ancestors]) {
        if (parent.fatherId || parent.motherId) {
          const grandparents = await this.getAncestors(
            parent._id.toString(),
            generations - 1
          );
          ancestors.push(...grandparents);
        }
      }
    }
    
    return ancestors;
  }

  async getByGeneration(generation: number): Promise<FamilyMember[]> {
    return this.familyMemberModel
      .find({ generation })
      .sort({ fullName: 1 })
      .exec();
  }

  async search(query: string): Promise<FamilyMember[]> {
    return this.familyMemberModel
      .find({
        $or: [
          { fullName: { $regex: query, $options: 'i' } },
          { nickname: { $regex: query, $options: 'i' } },
          { biography: { $regex: query, $options: 'i' } },
          { hometown: { $regex: query, $options: 'i' } },
        ],
      })
      .limit(20)
      .exec();
  }
} 