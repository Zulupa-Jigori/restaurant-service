import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { Dish } from './entities/dish.entity';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { FileUpload } from './interfaces/file-upload.interface';

const client = new S3Client({});

@Injectable()
export class DishesService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Dish) private readonly dishRepository: Repository<Dish>,
  ) {}

  async create(createDishDto: CreateDishDto, fileUpload: FileUpload) {
    const isDishExist = await this.dishRepository.findOne({
      where: { title: createDishDto.title },
    });
    if (isDishExist) {
      throw new BadRequestException('This dish is already exist');
    }

    const region = this.configService.get('AWS_REGION');
    const bucketName = this.configService.get('AWS_BUCKET_NAME');
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Body: fileUpload.buffer,
      Key: `dishes/${uuid()}-${fileUpload.filename}`,
      ContentType: fileUpload.mimetype,
    });

    try {
      await client.send(command);
      return this.dishRepository.save({
        ...createDishDto,
        imageUrl: `https://${bucketName}.s3.${region}.amazonaws.com/${command.input.Key}`,
      });
    } catch (err) {
      console.error(err);
    }
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
