import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourierDto } from './dto/create-courier.dto';
import { UpdateCourierDto } from './dto/update-courier.dto';
import { Courier } from './entities/courier.entity';

@Injectable()
export class CouriersService {
  constructor(
    @InjectRepository(Courier)
    private readonly courierRepository: Repository<Courier>,
  ) {}
  create(createCourierDto: CreateCourierDto) {
    const item = this.courierRepository.create(createCourierDto);
    return this.courierRepository.save(item);
  }

  findAll() {
    return this.courierRepository.find();
  }

  findOne(id: number) {
    return this.courierRepository.findOneBy({ id });
  }

  async update(id: number, updateCourierDto: UpdateCourierDto) {
    const item = await this.courierRepository.preload({
      id,
      ...updateCourierDto,
    });

    if (!item) {
      throw new NotFoundException();
    }

    return await this.courierRepository.save(item);
  }

  remove(id: number) {
    return this.courierRepository.delete(id);
  }
}
