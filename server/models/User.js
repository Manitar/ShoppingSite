import mongoose from "mongoose"
const Schema = mongoose.Schema

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, min: 5 },
  isAdmin: { type: Boolean, required: true },
  cart: { type: Map, of: Object }, // {{product: product1, quantity: 3}, {product: product2, quantity: 1}}
  purchasedItems: { type: Array, default: [] }
},
  { timestamps: true })

const User = mongoose.model("User", UserSchema)
export default User;