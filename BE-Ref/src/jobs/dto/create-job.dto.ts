import {
  IsArray,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import mongoose from 'mongoose';

export class Company {
  @IsNotEmpty({ message: 'ID không được để trống' })
  _id: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty({ message: 'Name không được để trống' })
  name: string;

  logo: string;
}

export class CreateJobDto {
  @IsNotEmpty({
    message: 'Name không được để trống',
  })
  name: string;

  @IsNotEmpty({
    message: 'Skills không được để trống',
  })
  @IsArray({
    message: 'Skills có định dạng là array',
  })
  @IsString({
    each: true,
    message: 'Skill có định dạng là String',
  })
  skills: string[];

  @IsNotEmpty({
    message: 'Company không được để trống',
  })
  @IsObject()
  @ValidateNested()
  @Type(() => Company)
  company: Company;

  @IsNotEmpty({
    message: 'Salary không được để trống',
  })
  salary: number;

  @IsNotEmpty({
    message: 'Level không được để trống',
  })
  level: string;

  @IsNotEmpty({
    message: 'Description không được để trống',
  })
  description: string;
  @IsNotEmpty({
    message: 'Location không được để trống',
  })
  location: string;
  @IsNotEmpty({
    message: 'Start Date không được để trống',
  })
  @IsDate({
    message: 'field startDate không đúng định dạng',
  })
  @Transform(({ value }) => new Date(value))
  startDate: Date;

  @IsNotEmpty({
    message: 'End Date không được để trống',
  })
  @IsDate({
    message: 'field endDate không đúng định dạng',
  })
  @Transform(({ value }) => new Date(value))
  endDate: Date;
}

// export class RegisterJobDto {
//   @IsNotEmpty({
//     message: 'Name không được để trống',
//   })
//   name: string;
//   @IsEmail(
//     {},
//     {
//       message: 'Email không đúng định dạng',
//     },
//   )
//   @IsNotEmpty({
//     message: 'Email không được để trống',
//   })
//   email: string;

//   @IsNotEmpty({
//     message: 'Password không được để trống',
//   })
//   password: string;
//   @IsNotEmpty({
//     message: 'Age không được để trống',
//   })
//   age: number;
//   @IsNotEmpty({
//     message: 'Role không được để trống',
//   })
//   role: number;

//   @IsNotEmpty({
//     message: 'Company không được để trống',
//   })
//   @IsObject()
//   @ValidateNested()
//   @Type(() => Company)
//   company: Company;

//   address: string;
//   gender: string;
// }
