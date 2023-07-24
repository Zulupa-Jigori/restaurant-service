import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DishesService } from './dishes.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { Dish } from './entities/dish.entity';

describe('DishesService', () => {
  let service: DishesService;
  let repositoryMock: Partial<Record<keyof Repository<Dish>, jest.Mock>>;

  beforeEach(async () => {
    repositoryMock = {
      findOne: jest.fn(),
      find: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DishesService,
        {
          provide: getRepositoryToken(Dish),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get<DishesService>(DishesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new dish', async () => {
    const createDishDto: CreateDishDto = {
      title: 'Test Dish',
      description: 'This is a test dish',
      price: 100,
    };

    const mockSavedDish: Dish = {
      id: 1,
      ...createDishDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest
      .spyOn(service['dishRepository'], 'findOne')
      .mockResolvedValue(undefined);

    jest
      .spyOn(service['dishRepository'], 'save')
      .mockResolvedValue(mockSavedDish);

    const result = await service.create(createDishDto);

    expect(result).toEqual(mockSavedDish);
  });

  it('should return an array of dishes', async () => {
    const mockDishes: Dish[] = [
      {
        id: 1,
        title: 'Dish 1',
        description: 'Description 1',
        price: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        title: 'Dish 2',
        description: 'Description 2',
        price: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    jest.spyOn(service['dishRepository'], 'find').mockResolvedValue(mockDishes);

    const result = await service.findAll();

    expect(result).toEqual(mockDishes);
  });

  it('should return a dish by id', async () => {
    const dishId = 1;
    const mockDish = {
      id: dishId,
      title: 'Test Dish',
      description: 'Description',
      price: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest
      .spyOn(service['dishRepository'], 'findOne')
      .mockResolvedValue(mockDish);

    const result = await service.findOne(dishId);

    expect(result).toEqual(mockDish);
  });

  it('should update an existing dish', async () => {
    const dishId = 1;
    const updateDishDto = {
      title: 'Updated Dish',
      description: 'Updated Description',
    };

    const mockExistingDish = {
      id: dishId,
      title: 'Test Dish',
      description: 'Description',
      price: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest
      .spyOn(service['dishRepository'], 'findOne')
      .mockResolvedValue(mockExistingDish);

    jest
      .spyOn(service['dishRepository'], 'update')
      .mockResolvedValue({ raw: [], affected: 1, generatedMaps: [] });

    const result = await service.update(dishId, updateDishDto);

    expect(result).toEqual({ raw: [], affected: 1, generatedMaps: [] });
  });

  it('should delete a dish by id', async () => {
    const dishId = 1;

    jest
      .spyOn(service['dishRepository'], 'delete')
      .mockResolvedValue({ raw: [], affected: 1 });

    const result = await service.remove(dishId);

    expect(result).toEqual({ raw: [], affected: 1 });
  });
});
