import { IsMilitaryTime, ValidateNested } from 'class-validator';

class ScheduleTimeFrame {
  @IsMilitaryTime()
  startTime: string;

  @IsMilitaryTime()
  endTime: string;
}

export class RestaurantSchedule {
  @ValidateNested()
  workingDays: ScheduleTimeFrame;

  @ValidateNested()
  weekends: ScheduleTimeFrame;
}
