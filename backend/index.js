const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

// Routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const User = require("./models/User");

dotenv.config();
const app = express();

// Connect DB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB Connection Successfully!");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json())
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/stripe", stripeRoute);

// const test = async (req, res) => {
//   const date = new Date();
//   const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

//   try {
//       const data = await User.aggregate([
//           { $match: { username: { $eq: "10" } }},
//           {
//             $group: {
//                 _id: "$createdAt",
//                 total: { $sum: 1 }
//             }
//           }
//       ]);

//       console.log(data);
      
//       // const users = await User.find();
//       // console.log(users);

//   } catch (err) {
//       res.status(500).json(err);
//   }
// }

// test();

app.listen(process.env.PORT || 5000, () => {
  console.log("Back server is running!");
});
