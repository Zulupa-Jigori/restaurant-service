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
      throw new BadRequestException('This dish already exist');
    }
    const dish = await this.dishRepository.save({
      title: createDishDto.title,
      description: createDishDto.description,
      price: createDishDto.price,
      imageUrl: createDishDto.imageUrl,
    });
    return dish;
  }

  async findAll() {
    return await this.dishRepository.find();
  }

  async findOne(id: number) {
    return await this.dishRepository.findOne({ where: { id } });
  }

  update(id: number, updateDishDto: UpdateDishDto) {
    return `This action updates a #${id} dish`;
  }

  async remove(id: number) {
    return await this.dishRepository.delete({ id });
  }
}
