import { IsNotEmpty, IsNumber, IsOptional, IsString, IsArray } from 'class-validator';

export class ProductDetailsCreateDto {

  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsString()
  @IsNotEmpty()
  size: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsOptional()
  discount: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}

