import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { PRODUCT_DETAIL_MODEL } from 'src/commons/database.constant';
import { getSort } from 'src/commons/utils/get-sort';
import { ProductDetails } from '../interfaces/product-detail.dto';
import { filter } from 'rxjs/operators';

@Injectable()
export class ProductDetailsRepository {
  constructor(
    @Inject(PRODUCT_DETAIL_MODEL)
    private readonly readModel: Model<ProductDetails>,
  ) {}

  async updateOne(params): Promise<any> {
    return this.readModel.updateOne({id: params.id}, params)
  }

  async findAll(query): Promise<any[]> {
    const _query: any = {
      ...query,
    };
    let sort: any = {
      createAt: -1,
    };
    if (query.sort) {
      sort = getSort(query.sort);
      delete _query.sort;
    }
    if (query.isPaging) {
      const page = parseInt(query.page.toString());
      const pageSize = parseInt(query.pageSize.toString());

      delete _query.page;
      delete _query.pageSize;
      return await this.readModel
        .find(_query)
        .sort(sort)
        .limit(pageSize)
        .skip(page * pageSize - pageSize);
    }
    return await this.readModel.find(_query).sort(sort);
  }

  async updateMany(updateModels): Promise<any> {
      // return this.readModel.updateMany(query, params)
      return this.readModel.bulkWrite(
        updateModels.map(model => {
          return {
            updateOne: {
              filter: {id: model.id},
              update: {
                $set: model
              },
              upsert: true,
              setDefaultsOnInsert: true,
            }
          }
        })
      )
  }

  async createMany(models) {
    return await this.readModel.insertMany(models)
  }


  async create(params): Promise<any> {
    return await this.readModel.create(params)
  }
}
