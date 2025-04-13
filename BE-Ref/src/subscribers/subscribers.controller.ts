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

import { IUser } from 'src/users/user.interface';
import { Public, ResponseMessage, SkipCheckPermission, User } from 'src/decorator/customize';
import { SubscribersService } from 'src/subscribers/subscribers.service';
import { CreateSubscriberDto } from 'src/subscribers/dto/create-subscriber.dto';
import { UpdateSubscriberDto } from 'src/subscribers/dto/update-subscriber.dto';
import { ApiTags } from '@nestjs/swagger';



@ApiTags('Subscriber')
@Controller('subscribers')
export class SubscribersController {
  constructor(private readonly subscribersService: SubscribersService) {}

  @ResponseMessage('Create Subscriber')
  @Post()
  create(
    @Body() createSubscriberDto: CreateSubscriberDto,
    @User() user: IUser,
  ) {
    return this.subscribersService.create(createSubscriberDto, user);
  }
  @ResponseMessage('Get Skills Subscriber')
  @Post('skills')
  getUserSkill(@User() user: IUser) {
    return this.subscribersService.getSkills(user);
  }

  @Public()
  @ResponseMessage('Find Subscriber')
  @Get()
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query() qs: string,
  ) {
    return this.subscribersService.findAll(+currentPage, +limit, qs);
  }
  @Public()
  @ResponseMessage('Get Subscriber By Id')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscribersService.findOne(id);
  }

  @ResponseMessage('Update Subscriber By Id')
  @SkipCheckPermission()
  @Patch()
  update(
    @Body() updateSubscriberDto: UpdateSubscriberDto,
    @User() user: IUser,
  ) {
    return this.subscribersService.update(updateSubscriberDto, user);
  }

  @ResponseMessage('Delete Subscriber By Id')
  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.subscribersService.remove(id, user);
  }
}
