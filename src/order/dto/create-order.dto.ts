import { IsArray, IsNotEmpty, IsDecimal } from 'class-validator';

export class CreateOrderDto {
  @IsArray()
  @IsNotEmpty()
  items: string[]; // Array of food item IDs

  @IsDecimal()
  totalPrice: number;

  @IsNotEmpty()
  userId: string;
}
