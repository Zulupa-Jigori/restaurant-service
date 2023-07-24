import { IsNumber, IsString } from 'class-validator';
export class CreateDishDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;
}
