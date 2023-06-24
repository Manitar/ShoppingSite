import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { config as dotenvConfig } from 'dotenv';

// These 2 lines let us access the secret key in .env folder
dotenvConfig();
const secret_key = process.env.JWT_SECRET_KEY

export const validateToken = async (req, res) => {
  try {
    const { token } = req.body
    console.log(token)
    if (token) {
      const decoded = jwt.verify(token, secret_key) //This line verifies if the token is authorized

      res.status(202).json(true) // 202 = Accepted
      return true
    }
  }
  catch (error) {
    res.status(403).json({ error: "Token could not be validated" }) // 403 = Forbidden
    return false
  }
}


export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, isAdmin } = req.body;
    const checkEmail = await User.findOne({ email })
    if (checkEmail) {
      res.status(409).json({ error: "A user with that email is already registered" }) // 409 = Conflict
      return
    }
    // Hashing the password here
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      isAdmin,
      cart: [],
      purchasedItems: []
    });
    const savedUser = await user.save();
    res.status(201).json(savedUser); // 201 = Created
  }
  catch (error) {
    res.status(500).json({ error: "User could not be registered" })
  }

}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User does not exist" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }


    const token = jwt.sign({ id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName, isAdmin: user.isAdmin }, secret_key, { expiresIn: '4h' });

    res.json({ message: "Login successful", user, token });
  } catch (error) {
    res.status(500).json({ error: "Could not login" });
  }
};