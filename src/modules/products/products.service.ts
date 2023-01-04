import { Injectable } from '@nestjs/common';
import { ProductRepository } from './repositories/product.repository';
import { ProductCreateDto } from './dto/product.dto';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import * as uuid from 'uuid';
@Injectable()
export class ProductsService {
  constructor(private readonly repository: ProductRepository) {}

  async createProduct(user, dto: ProductCreateDto) {
    const oldModel = await this.repository.findByQuery({ name: dto.name });
    if (oldModel && oldModel.length) {
      throw new BadRequestException('product existed');
    }
    const model: any = { ...dto };
    model.createdBy = user.id;
    model.id = uuid.v4();
    const result = await this.repository.createProduct(model);
    return result;
  }

  async findAll(user, query) {
    let _query: any = { ...query };
    _query.createdBy = user.id;
    if (_query['page'] && _query['pageSize']) {
      const page = parseInt(query['page'].toString());
      const pageSize = parseInt(query['pageSize'].toString());
      _query.page = page;
      _query.pageSize = pageSize;
      _query.isPaging = true;
      return Promise.all([
        await this.repository.findByQuery(_query),
        await this.repository.countAll(_query),
      ]).then((res) => {
        const total = res[1];
        return {
          items: res[0],
          total: total,
          page: page,
          pageSize: pageSize,
          totalPage: Math.floor((total + pageSize - 1) / pageSize),
        };
      });
    }

    return await this.repository.findByQuery(_query);
  }
}
