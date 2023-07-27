import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
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
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createDishDto: CreateDishDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 500000 }), // 500kb
          new FileTypeValidator({ fileType: /^image\/(jpg|jpeg|png)$/ }),
        ],
      }),
    )
    image: Express.Multer.File,
  ) {
    return this.dishesService.create(createDishDto, {
      buffer: image.buffer,
      filename: image.originalname,
      mimetype: image.mimetype,
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
