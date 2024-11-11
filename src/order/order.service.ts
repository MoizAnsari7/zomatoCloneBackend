import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto';
import { UserService } from '../user/user.service';
import { FoodService } from '../food/food.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private userService: UserService,
    private foodService: FoodService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const user = await this.userService.findById(createOrderDto.userId);
    const items = await Promise.all(
      createOrderDto.items.map((itemId) => this.foodService.findOne(itemId)),
    );

    if (!user || items.includes(undefined)) {
      throw new NotFoundException('Invalid user or food item');
    }

    const order = this.orderRepository.create({
      ...createOrderDto,
      user,
      items,
    });
    return this.orderRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }
}
