import { Injectable } from '@nestjs/common';
import { ProductRepository } from './repositories/product.repository';
import { ProductCreateDto } from './dto/product.dto';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';

@Injectable()
export class ProductsService {
    constructor(
        private readonly repository: ProductRepository
    ){}

    async createProduct(user, dto: ProductCreateDto) {
        const oldModel = await this.repository.findByQuery({name: dto.name})
        if(oldModel || oldModel.length)  {
            throw new BadRequestException('product existed')
        }
        
    }
}
