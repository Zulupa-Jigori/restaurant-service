import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';
export class CreateDishDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @Transform(({ value }) => Number(value))
  price: number;
}
