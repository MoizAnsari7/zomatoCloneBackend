import { IsString, IsOptional } from 'class-validator';

export class UpdateSellerDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  password?: string;
}
