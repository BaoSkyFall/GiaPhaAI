import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User as UserM, UserDocument } from './schemas/user.schema';
import mongoose from 'mongoose';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from './user.interface';
import aqp from 'api-query-params';
import { ConfigService } from '@nestjs/config';
import { Role, RoleDocument } from 'src/roles/schemas/role.schema';
import { USER_ROLE } from 'src/databases/sample';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserM.name) private userModel: SoftDeleteModel<UserDocument>,
    @InjectModel(Role.name) private roleModel: SoftDeleteModel<RoleDocument>,
  ) {}
  configService: ConfigService = new ConfigService();

  getHashPassword = (plainPassword: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(plainPassword, salt);
    return hash;
  };
  async create(createUserDTO: CreateUserDto) {
    const isExistedUser = await this.userModel.findOne({
      email: createUserDTO.email,
    });
    if (isExistedUser) {
      throw new BadRequestException(`Email ${createUserDTO.email} is existed`);
    }

    const hashPassword = this.getHashPassword(createUserDTO.password);
    const user = await this.userModel.create({
      email: createUserDTO.email,
      password: hashPassword,
      name: createUserDTO.name,
      address: createUserDTO.address,
      age: createUserDTO.age,
      gender: createUserDTO.gender,
    });
    return {
      _id: user._id,
      createdAt: user.createdAt,
    };
  }
  async register(registerUserDTO: RegisterUserDto) {
    const isExistedUser = await this.userModel.findOne({
      email: registerUserDTO.email,
    });
    if (isExistedUser) {
      throw new BadRequestException(
        `Email ${registerUserDTO.email} is existed`,
      );
    }
    const userRole = await this.roleModel.findOne({
      name: USER_ROLE,
    });
    const hashPassword = this.getHashPassword(registerUserDTO.password);
    const user = await this.userModel.create({
      email: registerUserDTO.email,
      password: hashPassword,
      name: registerUserDTO.name,
      address: registerUserDTO.address,
      age: registerUserDTO.age,
      gender: registerUserDTO.gender,
      company: registerUserDTO.company,
      role: userRole?.id,
    });
    return {
      _id: user._id,
      createdAt: user.createdAt,
    };
  }
  async findAll(currentPage: number, limit: number, qs: any) {
    const { filter, projection, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;
    const { sort } = aqp(qs);
    const offset = (+currentPage - 1) * +limit;
    const defaultLimit = +limit ? +limit : 10;
    const totalItems = (await this.userModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);
    // if (isEmpty(sort)) {
    //   // @ts-ignore: Unreachable code error
    //   sort = "-updatedAt"
    // }
    const result = await this.userModel
      .find(filter)
      .skip(offset)
      .limit(defaultLimit)
      // @ts-ignore: Unreachable code error
      .sort(sort)
      .populate(population)
      .select('-password -refreshToken')
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

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException(
        { message: 'Not Found User' },
        HttpStatus.CREATED,
      );
    }
    const user = await this.userModel
      .findOne({
        _id: id,
      })
      .populate({
        path: 'role',
        select: {
          name: 1,
          _id: 1,
        },
      })
      .select('-password -isDeleted -deletedAt');
    return user;
  }
  findOneByUsername(username: string) {
    return this.userModel
      .findOne({
        email: username,
      })
      .populate({
        path: 'role',
        select: { name: 1 },
      });
  }

  isValidPassword(password: string, hashPassword: string) {
    return compareSync(password, hashPassword);
  }
  async update(updateUserDto: UpdateUserDto, user: IUser,_id: string) {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new BadRequestException(
        { message: `Not Found User With Id: ${_id}` },
      );
    }
    return this.userModel.updateOne(
      { _id },
      {
        ...updateUserDto,
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
  }

  async remove(id: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return 'Not found User';
    }
    const foundUser = await this.userModel.findById(id);
    if (foundUser.email === this.configService.get<string>('EMAIL_ADMIN')) {
      throw new BadRequestException('Không thể xoá tài khoản Admin!!');
    }
    await this.userModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
    return this.userModel.softDelete({ _id: id });
  }
  async updateUserRefreshToken(_id: string, refreshToken: string) {
    return await this.userModel.updateOne(
      { _id },
      {
        refreshToken,
      },
    );
  }
  findUserByToken = (refreshToken: string) => {
    return this.userModel.findOne({ refreshToken }).populate({
      path: 'role',
      select: { name: 1 },
    });
  };
}
