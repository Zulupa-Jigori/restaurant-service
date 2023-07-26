import { IsMobilePhone, IsString } from 'class-validator';

export class CreateCourierDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsMobilePhone('uk-UA')
  phone: string;
}
