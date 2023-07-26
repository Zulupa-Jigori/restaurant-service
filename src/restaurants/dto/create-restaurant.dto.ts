import { Transform, Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { RestaurantSchedule } from '../entities/restaurant-schedule.entity';
import { SchedulePeriod } from '../enums/schedule-period.enum';
import { RestaurantScheduleDto } from './restaurant-schedule.dto';

export class CreateRestaurantDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @ValidateNested()
  @Type(() => RestaurantScheduleDto)
  @Transform(({ value }: { value: RestaurantScheduleDto }) => [
    { ...value.workingDays, period: SchedulePeriod.WorkingDays },
    { ...value.weekends, period: SchedulePeriod.Weekends },
  ])
  schedule: RestaurantSchedule[];
}
