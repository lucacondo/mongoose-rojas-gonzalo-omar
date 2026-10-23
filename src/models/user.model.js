import { model, Schema } from "mongoose";

export const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlenght: 20,
    match: /^[a-zA-Z0-9 ]+$/,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  age: {
    type: Number,
    min: 5,
    max: 100,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 20,
    select: false,
  }
},
  {
    timestamps: true
  });

export const UserModel = model("Users", UserSchema);