import { IsArray, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateSubscriberDto {
  @IsNotEmpty({
    message: 'Email không được để trống',
  })
  @IsEmail({
    message: 'Email không đúng định dạng',
  })
  email: string;

  @IsNotEmpty({
    message: 'Tên không được để trống',
  })
  name: string;

  @IsNotEmpty({
    message: 'Kỹ năng không được để trống',
  })
  @IsArray({
    message: 'Kỹ năng không phải mảng array',
  })
  skills: string[];
}
