import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CouriersService } from './couriers.service';
import { Courier } from './entities/courier.entity';

describe('CouriersService', () => {
  let service: CouriersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CouriersService,
        {
          provide: getRepositoryToken(Courier),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<CouriersService>(CouriersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
