import {
  Controller,
  Get,
  Post,
  Render,
  UseGuards,
  Request,
  Body,
  Res,
} from '@nestjs/common';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { LocalAuthGuard } from './local.auth.guard';
import { AuthService } from './auth.service';
import { CreateUserDto, UserLoginDto } from 'src/users/dto/create-user.dto';
import { Response } from 'express';
import { IUser } from 'src/users/user.interface';
import { RolesService } from 'src/roles/roles.service';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private roleService: RolesService,
  ) {}

  @ResponseMessage('User login')
  @UseGuards(LocalAuthGuard)
  @UseGuards(ThrottlerGuard)
  @Public()
  @ApiBody({ type: UserLoginDto })
  @Post('/login')
  async handleLogin(
    @Request() req,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(req.user, response);
  }

  @ResponseMessage('User Refresh Token')
  @Public()
  @Get('/refresh')
  async handleRefreshToken(
    @Request() req,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = req.cookies['refresh_token'];
    return this.authService.processNewToken(refreshToken, response);
    // return this.authService.login(req.user, response);
  }
  @ResponseMessage('Register new user success')
  @Public()
  @Post('/register')
  async handleRegister(@Body() createUserDTO: CreateUserDto) {
    return this.authService.register(createUserDTO);
  }

  @ResponseMessage('User logout')
  @UseGuards(LocalAuthGuard)
  @Post('/logout')
  async handleLogout(
    @Request() req,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.logout(req.user, response);
  }
  // @UseGuards(JwtAuthGuard)
  // @Public()
  @Get('account')
  async getAccount(@User() user: IUser) {
    const permissionGetFromDB = this.roleService.findOne(user.role._id) as any;
    user.permissions = (await permissionGetFromDB).permissions;
    return { user };
  }
}
