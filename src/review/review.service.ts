import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UserService } from '../user/user.service';
import { RestaurantService } from '../restaurant/restaurant.service';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    private userService: UserService,
    private restaurantService: RestaurantService,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const user = await this.userService.findById(createReviewDto.userId);
    const restaurant = await this.restaurantService.findOne(createReviewDto.restaurantId);

    if (!user || !restaurant) {
      throw new NotFoundException('User or Restaurant not found');
    }

    const review = this.reviewRepository.create({
      ...createReviewDto,
      user,
      restaurant,
    });
    return this.reviewRepository.save(review);
  }

  async findAll(): Promise<Review[]> {
    return this.reviewRepository.find();
  }

  async findOne(id: string): Promise<Review> {
    const review = await this.reviewRepository.findOne({ where: { id } });
    if (!review) throw new NotFoundException('Review not found');
    return review;
  }
}
