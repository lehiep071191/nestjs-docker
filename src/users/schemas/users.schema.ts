import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  _id: {type: String},
  name: {type: String},
  id: {type: String},
  email: {type: String},
  userName: {type: String},
  address: {type: String},
  birthday: {type: String},
  roleId: {type: String},
});

UserSchema.pre("save", function(next) {
    this._id = this.get('id')
    next()
})