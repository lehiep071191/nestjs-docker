import { Body, Controller, Post } from '@nestjs/common';
import { ProductDetailsService } from './product-details.service';
import { ProductDetailsCreateDto } from './dtos/product-details.dto';

@Controller('product-details')
export class ProductDetailsController {
    constructor(
        private readonly service: ProductDetailsService
    ){}

    @Post()
    createDetail(@Body()body: ProductDetailsCreateDto[]) {
        return this.service.createWithProduct(body)
    }
}
