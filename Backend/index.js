const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoute = require("./routes/user.js");
const authRoute = require("./routes/auth.js");
const productRoute = require("./routes/products.js");
const orderRoute = require("./routes/order.js");
const cartRoute = require("./routes/cart.js");
const paystackRoute = require("./routes/paystack.js");

// Load environment variables
dotenv.config();

const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    const maskedUri = 'mongodb+srv://Tegzy:Benjamin007$@cluster0.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0'
      ? process.env.DATABASE_URI.replace(/:\/\/.*@/, "://***:***@")
      : "undefined";
    console.error("Database connection error:", err);
    setTimeout(() => {
      mongoose.connect(process.env.DATABASE_URI).catch((retryErr) => {
        console.error("Retrying database connection failed:", retryErr);
      });
    }, 5000); // Retry after 5 seconds
    process.exit(1);
  });

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/checkout", paystackRoute);
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/carts", cartRoute);

// Start the server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});