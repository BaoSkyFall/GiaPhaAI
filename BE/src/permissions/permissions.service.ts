import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission, PermissionDocument } from './schema/permission.schema';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission.name)
    private permissionModel: Model<PermissionDocument>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto, user: any) {
    // Check if permission with same path and method already exists
    const existingPermission = await this.permissionModel.findOne({
      apiPath: createPermissionDto.apiPath,
      method: createPermissionDto.method,
    });

    // If permission already exists, throw an error
    if (existingPermission) {
      throw new ConflictException(
        `Permission with apiPath "${createPermissionDto.apiPath}" and method "${createPermissionDto.method}" already exists`,
      );
    }

    // Create new permission
    return this.permissionModel.create({
      ...createPermissionDto,
      createdBy: {
        _id: user.id,
        email: user.email,
      },
    });
  }

  async findAll(currentPage: number, limit: number, query: any) {
    const offset = (currentPage - 1) * limit;
    const defaultLimit = limit ? limit : 10;
    
    // Build filter
    const { status, ...filter } = query;
    const totalItems = await this.permissionModel.count(filter);
    const totalPages = Math.ceil(totalItems / defaultLimit);
    
    const result = await this.permissionModel
      .find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort({ createdAt: -1 })
      .exec();
      
    return {
      meta: {
        current: currentPage,
        pageSize: limit,
        pages: totalPages,
        total: totalItems,
      },
      result,
    };
  }

  findOne(id: string) {
    return this.permissionModel.findById(id);
  }

  update(id: string, updatePermissionDto: UpdatePermissionDto, user: any) {
    return this.permissionModel.findByIdAndUpdate(
      id,
      {
        ...updatePermissionDto,
        updatedBy: {
          _id: user.id,
          email: user.email,
        },
      },
      { new: true }
    );
  }

  async remove(id: string, user: any) {
    return this.permissionModel.findByIdAndDelete(id);
  }
} 