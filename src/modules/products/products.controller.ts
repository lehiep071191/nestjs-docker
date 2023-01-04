import {
  Controller,
  Get,
  UseGuards,
  Req,
  Query,
  Post,
  Body,
} from '@nestjs/common';
import { PermissionConstant } from 'src/commons/enums/permission.enum';
import { User } from 'src/decorators/user.decorator';
import PermissionGuard from '../auth/guards/permission.guard';
import { ProductCreateDto } from './dto/product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Get('get-by-user')
  @UseGuards(PermissionGuard(PermissionConstant.GET_PRODUCT_BY_USER))
  async getByUser(@User() user: any, @Query() query: any) {
    return await this.service.findAll(user, query);
  }

  @Post()
  @UseGuards(PermissionGuard(PermissionConstant.GET_PRODUCT_BY_USER))
  async createProduct(@User() user: any, @Body() dto: ProductCreateDto) {
    return await this.service.createProduct(user, dto);
  }
}
