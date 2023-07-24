import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { RestaurantSchedule } from './entities/restaurant-schedule.entity';
import { Restaurant } from './entities/restaurant.entity';
import { SchedulePeriod } from './enums/schedule-period.enum';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
    @InjectRepository(RestaurantSchedule)
    private readonly scheduleRepository: Repository<RestaurantSchedule>,
  ) {}
  async create({ name, address, schedule }: CreateRestaurantDto) {
    const restaurant = new Restaurant();
    restaurant.name = name;
    restaurant.address = address;
    restaurant.schedule = [];

    if (schedule) {
      const workingDaysSchedule = new RestaurantSchedule();
      workingDaysSchedule.period = SchedulePeriod.WorkingDays;
      workingDaysSchedule.startTime = schedule.workingDays.startTime;
      workingDaysSchedule.endTime = schedule.workingDays.endTime;

      const weekendsSchedule = new RestaurantSchedule();
      weekendsSchedule.period = SchedulePeriod.Weekends;
      weekendsSchedule.startTime = schedule.weekends.startTime;
      weekendsSchedule.endTime = schedule.weekends.endTime;

      await this.scheduleRepository.save([
        workingDaysSchedule,
        weekendsSchedule,
      ]);

      restaurant.schedule = [workingDaysSchedule, weekendsSchedule];
    }

    return await this.restaurantRepository.save(restaurant);
  }

  findAll() {
    return `This action returns all restaurants`;
  }

  findOne(id: number) {
    return `This action returns a #${id} restaurant`;
  }

  update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    return `This action updates a #${id} restaurant`;
  }

  remove(id: number) {
    return `This action removes a #${id} restaurant`;
  }
}
