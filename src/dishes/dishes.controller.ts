import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DishesService } from './dishes.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';

@ApiTags('dishes')
@Controller('dishes')
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  @Post()
  @ApiOperation({ summary: 'Create dish' })
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createDishDto: CreateDishDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.dishesService.create(createDishDto, {
      buffer: file.buffer,
      filename: file.originalname,
      mimetype: file.mimetype,
    });
  }

  @Get()
  @ApiOperation({ summary: 'Get all dishes' })
  findAll() {
    return this.dishesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get specific dish' })
  findOne(@Param('id') id: string) {
    return this.dishesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update specific dish' })
  update(@Param('id') id: string, @Body() updateDishDto: UpdateDishDto) {
    return this.dishesService.update(+id, updateDishDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete specific dish' })
  remove(@Param('id') id: string) {
    return this.dishesService.remove(+id);
  }
}
