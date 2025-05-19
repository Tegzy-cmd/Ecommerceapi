const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/products");
const orderRoute = require("./routes/order");
const cartRoute = require("./routes/cart");
const cors = require("cors");
const paystackRoute = require("./routes/paystack");
dotenv.config();

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(cors());
app.use("/api/checkout", paystackRoute);
app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/products",productRoute);
app.use("/api/orders",orderRoute);
app.use("/api/carts",cartRoute);




app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running on port 3000");
});
