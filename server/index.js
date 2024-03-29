import express from "express";
import mongoose from "mongoose";
import { config as dotenvConfig } from "dotenv";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";

/* CONFIGURATION */

const app = express();
app.use(express.json());
dotenvConfig();

// Enable CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080"); // Allow requests
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  ); // Allow these kind of methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allow requests with these headers
  next();
});

// This fixes a bug that doesn't let us add to cart
app.options("/*", (_, res) => {
  res.sendStatus(200);
});

/* .env info */
const port = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);

/* Connect to MONGODB */
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => console.log(`The chosen server port is: ${port}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
