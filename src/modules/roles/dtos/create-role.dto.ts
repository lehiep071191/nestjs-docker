import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'normal_user' })
  type: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ type: Array, example: [] })
  permissions: string[];

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, example: 'admin' })
  description: string;
}
