// src/restaurant/restaurant.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { Seller } from '../seller/seller.entity';
  
  @Entity()
  export class Restaurant {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    name: string;
  
    @Column()
    address: string;
  
    @Column({ nullable: true })
    description: string;
  
    @ManyToOne(() => Seller, (seller) => seller.restaurants)
    seller: Seller;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  