import { Connection } from 'mongoose';
import { PRODUCT_MODEL, DATABASE_CONNECTION } from 'src/commons/database.constant';
import { ProductSchema } from '../schemas/product.schema';

export const productProvider = [
  {
    provide: PRODUCT_MODEL,
    useFactory: (connection: Connection) => connection.model('Product', ProductSchema),
    inject: [DATABASE_CONNECTION],
  },
];