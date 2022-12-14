import { Connection } from 'mongoose';
import { DATABASE_CONNECTION, ROLE_MODEL } from 'src/commons/database.constant';
import { RoleSchema } from '../schemas/role.schema';

export const userProvider = [
  {
    provide: ROLE_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Role', RoleSchema),
    inject: [DATABASE_CONNECTION],
  },
];
