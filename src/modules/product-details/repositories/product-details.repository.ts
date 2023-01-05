import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { PRODUCT_DETAIL_MODEL } from 'src/commons/database.constant';
import { ProductDetails } from '../interfaces/product-detail.dto';

@Injectable()
export class ProductDetailsRepository {
  constructor(
    @Inject(PRODUCT_DETAIL_MODEL)
    private readonly readModel: Model<ProductDetails>,
  ) {}
}
