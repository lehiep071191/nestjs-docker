import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  _id: { type: String },
  name: { type: String },
  id: { type: String, unique: true },
  email: { type: String },
  userName: { type: String },
  address: { type: String },
  birthday: { type: String },
  roleId: { type: String },
  isFullPermission: { type: Boolean, default: false },
  isFirstLogin: { type: Boolean, default: false },
  password: { type: String },
  createdAt: {type: Date, default: () => new Date()},
  updatedAt: {type: Date, default: () => new Date()}
});

UserSchema.pre('save', function (next) {
  this._id = this.get('id');
  next();
});
