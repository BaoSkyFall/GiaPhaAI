import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from './user.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ResponseMessage('Register as admin new user success')
  @Post()
  create(@Body() registerUserDTO: RegisterUserDto) {
    return this.usersService.register(registerUserDTO);
  }
  @Get()
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query() qs: string,
  ) {
    return this.usersService.findAll(+currentPage, +limit, qs);
  }
  @ResponseMessage('Fetch User By Id')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ResponseMessage('Update User')
  @Patch(':id')
  async update(@Body() updateUserDto: UpdateUserDto, @User() user: IUser,@Param('id') id: string) {
    return this.usersService.update(updateUserDto, user, id);
  }

  @ResponseMessage('Delete User')
  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.usersService.remove(id, user);
  }
}
