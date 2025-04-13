import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    try {
      const user = await this.usersService.findByEmail(email);
      const isPasswordMatching = await bcrypt.compare(pass, user.password);
      
      if (isPasswordMatching) {
        const { password, ...result } = user.toObject ? user.toObject() : { ...user, password: undefined };
        delete result.password;
        return result;
      }
      
      return null;
    } catch (error) {
      return null;
    }
  }

  async login(user: any) {
    const userId = user._id || user.id;
    
    const payload = {
      email: user.email,
      sub: userId,
      roles: user.roles,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: '7d',
    });

    await this.usersService.setRefreshToken(userId, refreshToken);

    return {
      accessToken,
      refreshToken,
      user: {
        id: userId,
        email: user.email,
        fullName: user.fullName,
        roles: user.roles,
      },
    };
  }

  async register(createUserDto: CreateUserDto) {
    const newUser = await this.usersService.create(createUserDto);
    const userData = newUser.toObject ? newUser.toObject() : { ...newUser, password: undefined };
    delete userData.password;
    
    return this.login(userData);
  }

  async refreshToken(userId: string, refreshToken: string) {
    const user = await this.usersService.getUserIfRefreshTokenMatches(
      userId,
      refreshToken,
    );

    const payload = {
      email: user.email,
      sub: userId,
      roles: user.roles,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: userId,
        email: user.email,
        fullName: user.fullName,
        roles: user.roles,
      },
    };
  }

  async logout(userId: string) {
    await this.usersService.removeRefreshToken(userId);
    return { success: true };
  }
}