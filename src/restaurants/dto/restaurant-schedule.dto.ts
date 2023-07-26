import { IsMilitaryTime, ValidateNested } from 'class-validator';

class ScheduleTimeFrameDto {
  @IsMilitaryTime()
  startTime: string;

  @IsMilitaryTime()
  endTime: string;
}

export class RestaurantScheduleDto {
  @ValidateNested()
  workingDays: ScheduleTimeFrameDto;

  @ValidateNested()
  weekends: ScheduleTimeFrameDto;
}
