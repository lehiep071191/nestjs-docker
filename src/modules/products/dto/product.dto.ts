import { IsString, IsNotEmpty } from 'class-validator';
export class ProductCreateDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    supplier: string;
}