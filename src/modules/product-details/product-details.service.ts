import { Injectable } from '@nestjs/common';
import { ProductDetailsCreateDto } from './dtos/product-details.dto';
import { ProductDetailsRepository } from './repositories/product-details.repository';
import * as uuid from 'uuid';

@Injectable()
export class ProductDetailsService {
    constructor(
        private readonly repository: ProductDetailsRepository
    ){}
    
    async create() {

    }

    async createWithProduct(params: ProductDetailsCreateDto[]) {
        const models: any = [...params]
        models.map(item => {
            const id = uuid.v4()
            item.id = id
            return item
        })

        return this.repository.createMany(models)
        
    }

    async upodateProductDetail() {

    }

    async updateManyDetail() {
        
    }
}
