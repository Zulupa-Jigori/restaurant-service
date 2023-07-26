import { Transform, Type } from 'class-transformer';
import { IsEnum, IsString, ValidateNested } from 'class-validator';
import { RestaurantSchedule } from '../entities/restaurant-schedule.entity';
import { RestaurantStatus } from '../enums/restaurant-status.enum';
import { SchedulePeriod } from '../enums/schedule-period.enum';
import { RestaurantScheduleDto } from './restaurant-schedule.dto';

export class CreateRestaurantDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsEnum(RestaurantStatus)
  status: RestaurantStatus;

  @ValidateNested()
  @Type(() => RestaurantScheduleDto)
  @Transform(({ value }: { value: RestaurantScheduleDto }) => [
    { ...value.workingDays, period: SchedulePeriod.WorkingDays },
    { ...value.weekends, period: SchedulePeriod.Weekends },
  ])
  schedule: RestaurantSchedule[];
}
