import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/users/user.interface';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { genSaltSync, hashSync } from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import ms from 'ms';
import { Response } from 'express';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private roleService: RolesService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (!user) {
      return null;
    }
    const isValidPassword = this.usersService.isValidPassword(
      pass,
      user.password,
    );
    if (isValidPassword) {
      const userRole = user.role as any as { _id: string; name: string };
      const roleGetFromDB = await this.roleService.findOne(userRole._id);
      const objUser = {
        ...user.toObject(),
        permissions: roleGetFromDB?.permissions ?? [],
      };
      return objUser;
    }
    return null;
  }
  async login(user: IUser, response: Response) {
    const { _id, name, email, role, permissions } = user;
    const payload = {
      sub: 'token login',
      iss: 'from server',
      _id,
      name,
      email,
      role,
      // permissions,
    };
    const refreshToken = this.refreshToken(payload);
    await this.usersService.updateUserRefreshToken(_id, refreshToken);
    const userRole = user.role as any as { _id: string; name: string };
    const roleGetFromDB = await this.roleService.findOne(userRole._id);



    response.clearCookie('refresh_token');
    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: ms(this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRE')),
    });
    return {
      access_token: this.jwtService.sign(payload),
      refreshToken,
      user: {
        _id,
        name,
        email,
        role,
        permissions: roleGetFromDB.permissions,
      },
    };
  }
  async logout(user: IUser, response: Response) {
    const { _id, name, email, role } = user;
    const refreshToken = '';
    await this.usersService.updateUserRefreshToken(_id, refreshToken);
    response.clearCookie('refresh_token');
    return 'ok';
  }

  async register(createUserDTO: CreateUserDto) {
    return this.usersService.create(createUserDTO);
  }
  refreshToken = (payload) => {
    const refresh_token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRED'),
      expiresIn:
        ms(this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRE')) / 1000,
    });
    return refresh_token;
  };
  processNewToken = async (refreshToken: string, response: Response) => {
    try {
      this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRED'),
      });
      const user = await this.usersService.findUserByToken(refreshToken);
      if (user) {
        //update refresh token
        const { _id, name, email, role } = user;
        const payload = {
          sub: 'token login',
          iss: 'from server',
          _id,
          name,
          email,
          role,
        };
        const refreshToken = this.refreshToken(payload);
        await this.usersService.updateUserRefreshToken(
          _id.toString(),
          refreshToken,
        );
        response.clearCookie('refresh_token');
        response.cookie('refresh_token', refreshToken, {
          httpOnly: true,
          maxAge: ms(
            this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRE'),
          ),
        });
        return {
          access_token: this.jwtService.sign(payload),
          refreshToken,
          user: {
            _id,
            name,
            email,
            // role,
          },
        };
      } else {
        throw new BadRequestException(
          'Refresh token is not valid please login again',
        );
      }
    } catch (error) {
      throw new BadRequestException(
        'Refresh token is not valid please login again',
      );
    }
  };
}
