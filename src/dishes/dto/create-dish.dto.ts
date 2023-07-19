import { IsString, IsNumber } from 'class-validator';
export class CreateDishDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  price: string;

  @IsNumber()
  imageUrl: string;
}
