import Product from "../models/Product.js"


export const getProduct = async (req, res) => {
  try {
    const { productId } = req.params
    const product = await Product.findById(productId)

    if (!product) {
      res.status(404).json({ error: "No such product" })
    }

    res.json(product)
  }
  catch (error) {
    res.status(500).json({ error: "Could not get product" })
  }
}

export const getProductList = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products)
  }
  catch (error) {
    res.status(500).json({ error: "Could not get product list" })
  }
}


export const addProduct = async (req, res) => {
  try {
    const { productName, imagePath } = req.body

    const newProduct = new Product({ productName, imagePath });
    const savedProduct = await newProduct.save()

    res.status(201).json(savedProduct)
  }
  catch (error) {
    res.status(500).json({ error: "Could not add product" })
  }
}