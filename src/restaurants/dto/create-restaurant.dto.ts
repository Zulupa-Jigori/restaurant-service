import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { RestaurantStatus } from '../enums/restaurant-status.enum';
import { RestaurantSchedule } from './restaurant-schedule.dto';

export class CreateRestaurantDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsEnum(RestaurantStatus)
  status: RestaurantStatus;

  @IsOptional()
  @ValidateNested()
  schedule: RestaurantSchedule;
}
