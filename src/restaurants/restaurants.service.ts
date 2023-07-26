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
  create(createRestaurantDto: CreateRestaurantDto) {
    const item = this.restaurantRepository.create(createRestaurantDto);
    return this.restaurantRepository.save(item);
  }

  findAll() {
    return this.restaurantRepository.find();
  }

  findOne(id: number) {
    return this.restaurantRepository.findOneBy({ id });
  }

  async update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    const item = await this.restaurantRepository.preload({
      id,
      ...updateRestaurantDto,
    });

    if (!item) {
      throw new NotFoundException();
    }

    return this.restaurantRepository.save(item);
  }

  async remove(id: number) {
    return this.restaurantRepository.delete(id);
  }
}
