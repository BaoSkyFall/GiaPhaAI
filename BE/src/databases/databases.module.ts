import { Module } from '@nestjs/common';
import { DatabasesService } from './databases.service';
import { DatabasesController } from './databases.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { Role, RoleSchema } from 'src/roles/schemas/role.schema';
import { Permission, PermissionSchema } from 'src/permissions/schema/permission.schema';
import { UsersService } from 'src/users/users.service';
import { FamilyMember, FamilyMemberSchema } from 'src/family-tree/schemas/family-member.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
      { name: Permission.name, schema: PermissionSchema },
      { name: FamilyMember.name, schema: FamilyMemberSchema },
    ]),
  ],
  controllers: [DatabasesController],
  providers: [DatabasesService, UsersService],
})
export class DatabasesModule {} 