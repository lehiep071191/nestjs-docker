import * as mongoose from 'mongoose';
import { RolesTypeEnum } from 'src/commons/enums/role.enum';

export const RoleSchema = new mongoose.Schema({
  _id: { type: String },
  id: { type: String },
  type: {
    type: String,
    enum: RolesTypeEnum,
    default: RolesTypeEnum.NORMAL,
    unique: true,
  },
  permissions: { type: [String] },
  description: { type: String },
});

RoleSchema.pre('save', function (next) {
  this._id = this.get('id');
});
