import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Restaurant } from '../restaurant/restaurant.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  comment: string;

  @Column('int')
  rating: number;

  @ManyToOne(() => User, (user) => user.reviews, { eager: true })
  user: User;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.reviews, { eager: true })
  restaurant: Restaurant;
}
