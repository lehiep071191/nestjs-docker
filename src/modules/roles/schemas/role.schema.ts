import * as mongoose from 'mongoose';
import { RolesTypeEnum } from 'src/commons/enums/role.enum';

export const RoleSchema = new mongoose.Schema({
  _id: { type: String },
  id: { type: String },
  type: {
    type: String,
  },
  permissions: { type: [String] },
  description: { type: String },
});

RoleSchema.pre('save', function (next) {
  this._id = this.get('id');
  next();
});
