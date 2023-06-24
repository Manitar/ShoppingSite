import Product from "../models/Product.js";
import User from "../models/User.js"


export const getUserList = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users)
  }
  catch (error) {
    res.status(500).json({ error: "Could not get user list " })
  }
}
//router.get("/:userId/cart/:productId", getProductInCart)
export const getProductInCart = async (req, res) => {
  try {
    const { userId, productId } = req.params
    const user = await User.findById(userId)

    if (!user) {
      res.status(404).json({ error: "Could not find the user" })
      return
    }

    const product = await Product.findById(productId)

    if (!product) {
      res.status(404).json({ error: "Product does not exist!" })
      return
    }

    if (user.cart.has(productId)) {
      res.json(user.cart.get(productId))
      return
    }

    else {
      res.json(false)
      return
    }

  }
  catch (error) {
    res.status(500).json({ error: "Product not found in cart" })
  }
}
export const addProductToCart = async (req, res) => {
  try {
    const { userId, productId } = req.params
    const user = await User.findById(userId)

    if (!user) {
      res.status(404).json({ error: "Could not find the user who's cart needs updating" })
      return
    }


    const product = await Product.findById(productId)

    if (!product) {
      res.status(404).json({ error: "Product does not exist!" })
      return
    }
    const productInCart = {
      product: product,
      quantity: 1
    }
    user.cart.set(productId, productInCart)
    await user.save();

    res.json({ message: "Successfully added product to cart" })

  }
  catch (error) {
    res.status(500).json({ error: "Could not add product to cart" })
  }
}


export const updateQuantity = async (req, res) => {
  try {
    const { userId, productId, update } = req.params
    const numUpdate = parseInt(update, 10)
    const user = await User.findById(userId)

    if (!user) {
      res.status(404).json({ error: "Could not find the user who's product quantity needs updating" })
      return
    }

    const myProduct = await Product.findById(productId)

    if (!myProduct) {
      res.status(404).json({ error: "Product does not exist!" })
      return
    }

    ;
    let productInCart = user.cart.get(productId)
    productInCart.quantity += numUpdate
    user.cart.set(productId, productInCart)
    const newUser = await User.findByIdAndUpdate(userId, { cart: user.cart }, { new: true })

    res.json({ newUser })

  }
  catch (error) {
    res.status(500).json({ error: "Could not update quantity of product in cart" })
  }
}

// router.post("/:userId/purchase", purchaseItems)
// 
export const purchaseItems = async (req, res) => {
  try {
    let purchaseId
    const { userId } = req.params
    const user = await User.findById(userId)

    if (!user) {
      res.status(404).json({ error: "Could not find user" })
      return
    }
    // Object.keys(user.cart).forEach((id) => {
    //   user.purchasedItems.push({ purchaseId, cartItem: user.cart[id.toString()] });
    // });
    if (user.purchasedItems.length == 0) {
      purchaseId = 1
    }
    else {
      purchaseId = user.purchasedItems[user.purchasedItems.length - 1].purchaseId + 1
    }
    user.cart.forEach((value, key) => user.purchasedItems.push({ purchaseId, cartItem: user.cart.get(key) }))
    user.cart.clear()
    const newUser = await User.findByIdAndUpdate(userId, { cart: user.cart, purchasedItems: user.purchasedItems }, { new: true })

    res.json({ message: "Successfully purchased items in cart!" })
  }
  catch (error) {
    res.status(500).json({ error: "Could not purchase items" })
  }
}

// router.delete("/:userId/cart/:productId", removeProductFromCart)

export const removeProductFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.params
    const user = await User.findById(userId)

    if (!user) {
      res.status(404).json({ error: "Could not find the user" })
      return
    }

    const myProduct = await Product.findById(productId)

    if (!myProduct) {
      res.status(404).json({ error: "Product does not exist!" })
      return
    }
    if (!user.cart.has(productId)) {
      res.status(404).json({ error: "User has no such product in cart" })
      return
    }
    user.cart.delete(productId)

    await user.save();
    res.json({ message: "Successfully deleted product from cart" })
  }
  catch (error) {
    res.status(500).json({ error: "Could not remove item from cart" })
  }
}