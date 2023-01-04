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

    async findAll(user, query) {
        let _query: any = {...query}
        _query.createdBy = user.id
        if(_query['page'] && _query['pageSize']) {
            _query.page = parseInt(query['page'].toString)
            _query.pageSize = parseInt(query['pageSize'].toString)
            _query.isPaging = true
            return Promise.all([
                await this.repository.findByQuery(_query)
            ]).then(res => {
                console.log(res)
            })
        }

        return await this.repository.findByQuery(_query)

    }
}
