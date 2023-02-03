import * as mongoose from 'mongoose';

export const ProductDetailsSchema = new mongoose.Schema({
  _id: { type: String },
  createdAt: { type: Date, default: () => new Date() },
  updatedAt: { type: Date, default: () => new Date() },
  id: { type: String, unique: true },
  createdBy: { type: String },
  updatedBy: { type: String },

  productId: { type: String },
  color: { type: String },
  size: { type: String },
  price: { type: Number },
  quantity: { type: Number },
  discount: { type: Number },
  status: {type: String}
});

ProductDetailsSchema.pre('save', function (next) {
  this._id = this.get('id');
  next();
});

ProductDetailsSchema.pre('insertMany', function (next) {
  console.log('this:', this)
  next()
});
