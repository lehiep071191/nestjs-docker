import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsOptional,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class UserRequestDto {
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  secretKeySuperAdmin?: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ type: String, example: 'lehiep@gmail.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'Lê Hiệp' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: '12345678' })
  password: string;

  @IsOptional()
  @IsDate()
  @ApiProperty({ type: Date, example: '1991-03-29T05:50:06.7199222-04:00' })
  @Type(() => Date)
  birthday: any;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, example: 'Bình Minh - Thanh Oai - Hà Nội' })
  address: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'normal91' })
  userName: string;
}
