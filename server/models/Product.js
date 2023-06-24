import mongoose from "mongoose"
const Schema = mongoose.Schema

const ProductSchema = new Schema({
  productName: { type: String, required: true }
},
  { timestamps: true })

const Product = mongoose.model("Product", ProductSchema)
export default Product;