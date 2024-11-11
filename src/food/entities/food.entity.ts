import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Restaurant } from '../restaurant/entities/restaurant.entity';

@Entity()
export class Food {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.foods, { eager: true })
  restaurant: Restaurant;
}
