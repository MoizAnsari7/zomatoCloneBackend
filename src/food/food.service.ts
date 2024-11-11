import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Food } from './entities/food.entity';
import { CreateFoodDto, UpdateFoodDto } from './dto/create-food.dto';
import { RestaurantService } from '../restaurant/restaurant.service';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food)
    private foodRepository: Repository<Food>,
    private restaurantService: RestaurantService,
  ) {}

  async create(createFoodDto: CreateFoodDto): Promise<Food> {
    const restaurant = await this.restaurantService.findOne(createFoodDto.restaurantId);
    if (!restaurant) throw new NotFoundException('Restaurant not found');
    
    const food = this.foodRepository.create({ ...createFoodDto, restaurant });
    return this.foodRepository.save(food);
  }

  async findAll(): Promise<Food[]> {
    return this.foodRepository.find();
  }

  async findOne(id: string): Promise<Food> {
    const food = await this.foodRepository.findOne({ where: { id } });
    if (!food) throw new NotFoundException('Food item not found');
    return food;
  }

  async update(id: string, updateFoodDto: UpdateFoodDto): Promise<Food> {
    await this.foodRepository.update(id, updateFoodDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.foodRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Food item not found');
  }
}
