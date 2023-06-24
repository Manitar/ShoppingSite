import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { config as dotenvConfig } from 'dotenv';

// These 2 lines let us access the secret key in .env folder
dotenvConfig();
const secret_key = process.env.JWT_SECRET_KEY

export const validateToken = async (req, res) => {
  try {
    const token = req.query.token
    if (token) {
      const decoded = jwt.verify(token, secret_key) //This line verifies if the token is authorized
      res.status(202).json(token) // 202 = Accepted
    }
  }
  catch (error) {
    res.status(403).json({ error: "Token could not be validated" }) // 403 = Forbidden
  }
}


export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
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


    const token = jwt.sign({ email: user.email, firstName: user.firstName, lastName: user.lastName }, secret_key, { expiresIn: '4h' });

    res.json({ message: "Login successful", user, token });
  } catch (error) {
    res.status(500).json({ error: "Could not login" });
  }
};