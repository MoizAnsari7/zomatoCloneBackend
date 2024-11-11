// src/restaurant/restaurant.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    const restaurant = this.restaurantRepository.create(createRestaurantDto);
    return this.restaurantRepository.save(restaurant);
  }

  async findAll(): Promise<Restaurant[]> {
    return this.restaurantRepository.find();
  }

  async findOne(id: string): Promise<Restaurant> {
    const restaurant = await this.restaurantRepository.findOne({ where: { id } });
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID ${id} not found`);
    }
    return restaurant;
  }

  async update(id: string, updateRestaurantDto: UpdateRestaurantDto): Promise<Restaurant> {
    const restaurant = await this.findOne(id);
    Object.assign(restaurant, updateRestaurantDto);
    return this.restaurantRepository.save(restaurant);
  }

  async remove(id: string): Promise<void> {
    const result = await this.restaurantRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Restaurant with ID ${id} not found`);
    }
  }
}
