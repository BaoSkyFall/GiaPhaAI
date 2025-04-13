import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Permission, PermissionDocument } from 'src/permissions/schema/permission.schema';
import { Role, RoleDocument } from 'src/roles/schemas/role.schema';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { ADMIN_ROLE, INIT_PERMISSIONS, USER_ROLE } from './sample';
import { FamilyMember, FamilyMemberDocument } from 'src/family-tree/schemas/family-member.schema';
import { FAMILY_MEMBERS_SAMPLE } from './family-members.sample';

@Injectable()
export class DatabasesService implements OnModuleInit {
  private readonly logger = new Logger(DatabasesService.name);
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(Permission.name)
    private permissionModel: Model<PermissionDocument>,
    @InjectModel(Role.name)
    private roleModel: Model<RoleDocument>,
    @InjectModel(FamilyMember.name)
    private familyMemberModel: Model<FamilyMemberDocument>,
    private configService: ConfigService,
    private userService: UsersService,
  ) {}

  async onModuleInit() {
    const isInit = this.configService.get<string>('SHOULD_INIT');
    if (Boolean(isInit)) {
      const countUser = await this.userModel.count({});
      const countPermission = await this.permissionModel.count({});
      const countRole = await this.roleModel.count({});
      const countFamilyMembers = await this.familyMemberModel.count({});

      // Create permissions
      if (countPermission === 0) {
        await this.permissionModel.insertMany(INIT_PERMISSIONS);
      }

      // Create roles
      if (countRole === 0) {
        const permissions = await this.permissionModel.find({}).select('_id');
        await this.roleModel.insertMany([
          {
            name: ADMIN_ROLE,
            description: 'Quyền Administrator',
            isActive: true,
            permissions: permissions,
          },
          {
            name: USER_ROLE,
            description: 'Quyền người dùng thông thường',
            isActive: true,
            permissions: [], // Không set quyền, chỉ cần add ROLE
          },
        ]);
      }

      // Create sample users
      if (countUser === 0) {
        const adminRole = await this.roleModel.findOne({ name: ADMIN_ROLE });
        const userRole = await this.roleModel.findOne({ name: USER_ROLE });
        
        const defaultPassword = this.configService.get<string>('DEFAULT_ADMIN_PASS') || 'Admin@123';
        
        await this.userModel.insertMany([
          {
            fullName: 'Administrator',
            email: 'admin@giaphaai.com',
            password: defaultPassword,
            roles: [ADMIN_ROLE],
            isActive: true,
          },
          {
            fullName: 'User',
            email: 'user@giaphaai.com',
            password: defaultPassword,
            roles: [USER_ROLE],
            isActive: true,
          },
        ]);
      }
      
      // Create sample family members for family tree
      if (countFamilyMembers === 0) {
        const admin = await this.userModel.findOne({ email: 'admin@giaphaai.com' });
        
        if (admin) {
          const createdBy = {
            _id: admin._id,
            email: admin.email,
          };
          
          // Process all members to ensure references are created correctly
          const membersWithIds = FAMILY_MEMBERS_SAMPLE.map(member => ({
            ...member,
            createdBy
          }));
          
          await this.familyMemberModel.insertMany(membersWithIds);
          this.logger.log('>>> Family members sample data created successfully');
        }
      }

      if (countUser > 0 && countRole > 0 && countPermission > 0 && countFamilyMembers > 0) {
        this.logger.log('>>> Dữ liệu mẫu đã được khởi tạo trước đó...');
      }
    }
  }
} 