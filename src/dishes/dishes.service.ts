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

  async create(createDishDto: CreateDishDto) {
    const isDishExist = await this.dishRepository.findOne({
      where: { title: createDishDto.title },
    });
    if (isDishExist) {
      throw new BadRequestException('This dish is already exist');
    }
    return this.dishRepository.save(createDishDto);
  }

  async findAll() {
    return this.dishRepository.find();
  }

  async findOne(id: number) {
    return this.dishRepository.findOne({ where: { id } });
  }

  async update(id: number, updateDishDto: UpdateDishDto) {
    const isDishExist = await this.dishRepository.findOne({
      where: { id },
    });
    if (!isDishExist) {
      throw new BadRequestException('This dish does not exist');
    }
    return this.dishRepository.update(id, updateDishDto);
  }

  async remove(id: number) {
    return this.dishRepository.delete({ id });
  }
}
