import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { getSort } from "src/commons/utils/get-sort";
import { PRODUCT_MODEL } from '../../../commons/database.constant';
import { Product } from "../interfaces/product.interface";

@Injectable()
export class ProductRepository {
    constructor(
        @Inject(PRODUCT_MODEL)
        private readonly realModel: Model<Product>, 
    ){}

    async countModel(query) {
        return await this.realModel.countDocuments(query)
    }

    async createProduct(params) {
        return await this.realModel.create(params)
    }

    async findByQuery(query) {
        const _query: any = {
            ...query
        }
        let sort: any = {
            createAt: -1
        }
        if(query.sort) {
            sort = getSort(query.sort)
            delete _query.sort
        }
        if(query.isPaging) {
            const page = parseInt(query.page.toString())
            const pageSize = parseInt(query.pageSize.toString())
            
            delete _query.page
            delete _query.pageSize
            return await this.realModel.find(_query).sort(sort).limit(pageSize).skip(page * pageSize - pageSize)
        }
        return await this.realModel.find(_query).sort(sort)
    }
}