import { Connection } from 'mongoose';
import {
  PRODUCT_DETAIL_MODEL,
  DATABASE_CONNECTION,
} from 'src/commons/database.constant';
import { ProductDetailsSchema } from '../schemas/product-details.schema';

export const productDetailProvider = [
  {
    provide: PRODUCT_DETAIL_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('ProductDetails', ProductDetailsSchema),
    inject: [DATABASE_CONNECTION],
  },
];
