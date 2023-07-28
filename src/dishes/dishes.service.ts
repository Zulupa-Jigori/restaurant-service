import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { Dish } from './entities/dish.entity';
import { FileUpload } from './interfaces/file-upload.interface';

const client = new S3Client({});

@Injectable()
export class DishesService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Dish) private readonly dishRepository: Repository<Dish>,
  ) {}
  region = this.configService.get('AWS_REGION');
  bucketName = this.configService.get('AWS_BUCKET_NAME');

  async create(createDishDto: CreateDishDto, fileUpload: FileUpload) {
    const dish = await this.dishRepository.findOne({
      where: { title: createDishDto.title },
    });
    if (dish) {
      throw new BadRequestException('This dish is already exist');
    }

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Body: fileUpload.buffer,
      Key: `dishes/${uuid()}-${fileUpload.filename}`,
      ContentType: fileUpload.mimetype,
    });

    try {
      await client.send(command);
      return this.dishRepository.save({
        ...createDishDto,
        imageUrl: `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${command.input.Key}`,
      });
    } catch (err) {
      console.error(err);
    }
  }

  findAll() {
    return this.dishRepository.find();
  }

  findOne(id: number) {
    return this.dishRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateDishDto: UpdateDishDto,
    fileUpload: FileUpload,
  ) {
    const dish = await this.dishRepository.findOne({
      where: { id },
    });
    if (!dish) {
      throw new BadRequestException('This dish does not exist');
    }

    const uploadImage = new PutObjectCommand({
      Bucket: this.bucketName,
      Body: fileUpload.buffer,
      Key: `dishes/${uuid()}-${fileUpload.filename}`,
      ContentType: fileUpload.mimetype,
    });

    const prevFileName = dish.imageUrl.split('dishes/')[1];
    const removeImage = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: `dishes/${prevFileName}`,
    });

    try {
      await client.send(uploadImage);
      await client.send(removeImage);
      return this.dishRepository.save({
        id,
        ...updateDishDto,
        imageUrl: `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${uploadImage.input.Key}`,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async remove(id: number) {
    const dish = await this.findOne(id);
    const fileName = dish.imageUrl.split('dishes/')[1];
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: `dishes/${fileName}`,
    });
    client.send(command);
    return this.dishRepository.remove(dish);
  }
}
