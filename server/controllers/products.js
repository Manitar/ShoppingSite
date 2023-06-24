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
// router.get("/search/:searchQuery", searchProducts)
export const searchProducts = async (req, res) => {
  try {
    const { searchQuery } = req.params
    const searchResults = await Product.find({
      productName: { $regex: new RegExp(searchQuery, 'i') },
    });
    res.json(searchResults);
  }
  catch (error) {
    res.status(500).json({ error: "Error while searching products" })
  }
}

export const addProduct = async (req, res) => {
  try {
    const { productName } = req.body
    console.log(productName)

    const newProduct = new Product({ productName });
    const savedProduct = await newProduct.save()

    res.status(201).json(savedProduct)
  }
  catch (error) {
    res.status(500).json({ error: "Could not add product" })
  }
}