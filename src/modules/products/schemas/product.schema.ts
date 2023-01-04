import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  _id: { type: String },
  createdAt: { type: Date, default: () => new Date() },
  updatedAt: { type: Date, default: () => new Date() },
  id: { type: String, unique: true },
  supplier: { type: Object },
  createdBy: { type: String },
  updatedBy: { type: String },
  name: { type: String },
});

ProductSchema.pre('save', function (next) {
  this._id = this.get('id');
  next();
});
