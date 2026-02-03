import { Schema, model } from 'mongoose'

const cartSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'product' // model name, case matters
  }
})

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  cart: [cartSchema],
})

export const UserModel=model("user",userSchema)
