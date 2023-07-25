import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { Dish } from './entities/dish.entity';

@Injectable()
export class DishesService {
  constructor(
    @InjectRepository(Dish) private readonly dishRepository: Repository<Dish>,
  ) {}

  create(createDishDto: CreateDishDto) {
    const dish = this.dishRepository.create(createDishDto);
    return this.dishRepository.save(dish);
  }

  findAll() {
    return this.dishRepository.find();
  }

  findOne(id: number) {
    return this.dishRepository.findOne({ where: { id } });
  }

  async update(id: number, updateDishDto: UpdateDishDto) {
    const dish = await this.findOne(id);
    if (!dish) {
      throw new BadRequestException('This dish does not exist');
    }
    Object.assign(dish, updateDishDto);
    return this.dishRepository.save(dish);
  }

  async remove(id: number) {
    const dish = await this.findOne(id);
    if (!dish) {
      throw new BadRequestException('This dish does not exist');
    }
    return this.dishRepository.remove(dish);
  }
}
