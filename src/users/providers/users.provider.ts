import { Connection } from 'mongoose';
import { USER_MODEL, DATABASE_CONNECTION } from 'src/commons/database.constant';
import { UserSchema } from '../schemas/users.schema';

export const userProvider = [
  {
    provide: USER_MODEL,
    useFactory: (connection: Connection) => connection.model('User', UserSchema),
    inject: [DATABASE_CONNECTION],
  },
];