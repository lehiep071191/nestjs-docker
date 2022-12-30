import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
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
        const sort = {
            createAt: -1
        }
        if(query.sort) {
            
        }
        if(query.isPaging) {
            const page = parseInt(query.page.toString())
            const pageSize = parseInt(query.pageSize.toString())
            
            delete query.page
            delete query.pageSize
        }
        return await this.realModel.find(_query)
    }
}