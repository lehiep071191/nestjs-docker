import { IsString, IsNotEmpty } from 'class-validator';
export class ProductCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  supplier: object;
}
