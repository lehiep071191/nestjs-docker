import { ConfigService } from '@nestjs/config';
import * as mongoose from 'mongoose';
import { DATABASE_CONNECTION } from 'src/commons/database.constant';

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: (): Promise<typeof mongoose> => {
      const config = new ConfigService();
      console.log(config.get('DB_URL'));
      return mongoose.connect(config.get('DB_URL'));
    },
  },
];
