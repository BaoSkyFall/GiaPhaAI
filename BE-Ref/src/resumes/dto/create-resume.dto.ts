import { IsArray, IsDate, IsEmail, IsNotEmpty, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import mongoose from 'mongoose';

export class UpdatedBy {
  @IsNotEmpty()
  _id: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class History {
  @IsNotEmpty({ message: 'status không được để trống' })
  status: string;

  @IsNotEmpty({ message: 'updatedAt không được để trống' })
  @IsDate({
    message: 'field updatedAt không đúng định dạng',
  })
  @Transform(({ value }) => new Date(value))
  updatedAt: Date;
  @Type(() => UpdatedBy)
  updatedBy: UpdatedBy;
}

export class CreateResumeDto {
  //   @IsNotEmpty({
  //     message: 'Email không được để trống',
  //   })
  email: string;

  //   @IsNotEmpty({
  //     message: 'User Id không được để trống',
  //   })
  userId: string;

  @IsNotEmpty({
    message: 'Url không được để trống',
  })
  url: string;

  //   @IsNotEmpty({
  //     message: 'Status không được để trống',
  //   })
  status: string;

  @IsNotEmpty({
    message: 'Company Id không được để trống',
  })
  companyId: string;

  @IsNotEmpty({
    message: 'Job Id không được để trống',
  })
  jobId: string;

  @ValidateNested()
  @Type(() => History)
  history: History[];
}

// export class RegisterResumeDto {
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
