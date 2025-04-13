import { IsEmail, IsMongoId, IsNotEmpty, IsObject, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class Company {
  @IsNotEmpty({ message: 'ID không được để trống' })
  _id: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty({ message: 'Name không được để trống' })
  name: string;
}

export class CreateUserDto {
  @IsNotEmpty({
    message: 'Name không được để trống',
  })
  name: string;
  @IsEmail(
    {},
    {
      message: 'Email không đúng định dạng',
    },
  )
  @IsNotEmpty({
    message: 'Email không được để trống',
  })
  email: string;

  @IsNotEmpty({
    message: 'Password không được để trống',
  })
  password: string;
  @IsNotEmpty({
    message: 'Role không được để trống',
  })
  @IsMongoId({
    message: 'Định dạng Mongo ID',
  })
  role: mongoose.Schema.Types.ObjectId;
  @IsNotEmpty({
    message: 'Age không được để trống',
  })
  age: number;
  address: string;
  gender: string;
}

export class RegisterUserDto {
  @IsNotEmpty({
    message: 'Name không được để trống',
  })
  name: string;
  @IsEmail(
    {},
    {
      message: 'Email không đúng định dạng',
    },
  )
  @IsNotEmpty({
    message: 'Email không được để trống',
  })
  email: string;

  @IsNotEmpty({
    message: 'Password không được để trống',
  })
  password: string;
  @IsNotEmpty({
    message: 'Age không được để trống',
  })
  age: number;
  @IsNotEmpty({
    message: 'Role không được để trống',
  })
  role: number;

  @IsNotEmpty({
    message: 'Company không được để trống',
  })
  @IsObject()
  @ValidateNested()
  @Type(() => Company)
  company: Company;

  address: string;
  gender: string;
}

export class UserLoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'youremail@domain.com', description: 'Your Email' })
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '123',
    description: 'Password',
  })
  readonly password: string;
}
