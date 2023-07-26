import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
  ) {}
  async create({ name, address, schedule }: CreateRestaurantDto) {
    console.log('DEBUG:  RestaurantsService  create  schedule:', schedule);
    const restaurant = this.restaurantRepository.create({
      name,
      address,
      schedule,
    });

    return await this.restaurantRepository.save(restaurant);
  }

  findAll() {
    return this.restaurantRepository.find();
  }

  findOne(id: number) {
    return this.restaurantRepository.findOneBy({ id });
  }

  async update(id: number, { name, address, schedule }: UpdateRestaurantDto) {
    const restaurant = await this.restaurantRepository.preload({
      id,
      name,
      address,
      schedule,
    });

    if (!restaurant) {
      throw new NotFoundException();
    }

    return await this.restaurantRepository.save(restaurant);
  }

  async remove(id: number) {
    return this.restaurantRepository.delete(id);
  }
}
