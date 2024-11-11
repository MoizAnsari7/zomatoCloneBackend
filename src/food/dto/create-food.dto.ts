import { IsString, IsNotEmpty, IsDecimal } from 'class-validator';

export class CreateFoodDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDecimal()
  @IsNotEmpty()
  price: number;

  @IsString()
  description?: string;

  @IsString()
  restaurantId: string;
}

export class UpdateFoodDto {
  @IsString()
  name?: string;

  @IsDecimal()
  price?: number;

  @IsString()
  description?: string;
}
