import { IsString, IsInt, IsNotEmpty, Min, Max } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  restaurantId: string;
}
