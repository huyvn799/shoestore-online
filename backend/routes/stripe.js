const router = require("express").Router();
const middlewareController = require("../controllers/middlewareController");

const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_KEY);
const { countryCodes } = require("../data");

const Order = require("../models/Order");
const Product = require("../models/Product");

router.post("/checkout", middlewareController.verifyToken, async (req, res) => {
  
  let metaCustomer = {
    userId: req.body.userId,
  };
  req.body.cartItems.forEach((cartItem, index) => {

    const {desc, brand, seriesCode, categories, createdAt, updatedAt, __v, ...item} = cartItem;

    metaCustomer = {
      ...metaCustomer,
      [index]: JSON.stringify(item) //metadata chỉ lấy value String
    };
  }) 

  const customer = await stripe.customers.create({
    metadata: metaCustomer
  });

  //? chuyển đổi items từ JSON thành object
  // const { userId, ...items } = customer.metadata;
  // console.log(userId); 
  // const parseItems = Object.entries(items).map(([index, item]) => {
  //   return JSON.parse(item);
  // })
  // console.log(parseItems);

  const line_items = req.body.cartItems.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title.split("-")[0],
          images: [item.img],
          description: `Color: ${item.color} - Size: ${item.size}`,
          metadata: {
            id: item._id,
            size: item.size,
            color: item.color,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    allow_promotion_codes: true,
    // phone_number_collection: {
    //   enabled: true,
    // },
    // shipping_address_collection: {
    //   allowed_countries: ["US", "VN"]
    // },
    // shipping_details: {
    //   address: {
    //     city: "HCM",
    //     country: "VN",
    //     line1: "No 11 Street",
    //   },
    //   name: "Van Quoc Huy"
    // },
    customer: customer.id,
    // payment_method_types: ["card"],
    // shipping_address_collection: { allowed_countries: ["US", "CA"] },
    // shipping_options: [
    //   {
    //     shipping_rate_data: {
    //       type: "fixed_amount",
    //       fixed_amount: { amount: 0, currency: "usd" },
    //       display_name: "Free shipping",
    //       delivery_estimate: {
    //         minimum: { unit: "business_day", value: 5 },
    //         maximum: { unit: "business_day", value: 7 },
    //       },
    //     },
    //   },
    // ],
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  res.json({ url: session.url });
});

const createOrder = async (customer, data) => {
  const { userId, ...items } = customer.metadata;
  const parseItems = Object.entries(items).map(([index, item]) => {
    return JSON.parse(item);
  })

  const newOrder = new Order({
    userId: userId,
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    products: parseItems,
    subtotal: data.amount_subtotal,
    total: data.amount_total,
    shipping_info: data.customer_details,
    discount_amount: data.total_details.amount_discount,
    payment_status: data.payment_status,
  })

  // console.log(newOrder);

  const updateStock = async(product) => {
    console.log(product);
    try {
      // id có dạng [product]#[size]
      const currentProduct = await Product.findById(product._id.split('#')[0]);
      console.log("[currentProduct]", currentProduct);
      
      const updatedProduct = await Product.findByIdAndUpdate(
          product._id.split('#')[0],
          {
            size: {
              ...currentProduct.size,
              [product.size]: Number.parseInt(currentProduct.size[product.size]) - product.quantity,
            }                        
          },
          { new: true } // trả về object đã updated mới
      );
      console.log("[updateProduct]",updatedProduct);
      
    } catch (err) {
        console.log(err);
    }
  }

  newOrder.products.forEach(async (product) => {
    try {
      await updateStock(product);
    } catch (err) {
      console.log(err);
    }
  });
  // const handleUpdateProducts = async () => {
  //   try {
  //     await newOrder.products.forEach((product) => {
  //       updateStock(product);
  //   });
  //   } catch (err) {

  //   }
  // }

  try {
    const savedOrder = await newOrder.save();
    console.log("Process Order: ", savedOrder);
  } catch (err) {
    console.log(err);
  }
}

// STRIPE Webhooks

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    
    let data;
    let eventType;
    
    // This is your Stripe CLI webhook secret for testing your endpoint locally.
    let endpointSecret;
    // endpointSecret  = "whsec_98f37a5f54b7a8f370c1e6a5bd6c6981e05f29aadeb36455d098d2f7cd3444c8";
    
    if (endpointSecret) {
      let event;
      let sig = req.headers["stripe-signature"];

      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          sig,
          endpointSecret
        );
        console.log("Webhook verified");
      } catch (err) {
        console.log(`Webhook Error: ${err.message}`);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }

      data = event.data.object;
      eventType = event.type;
    } else {
      data = req.body.data.object;
      eventType = req.body.type;
    }

    // Handle the event
    console.log("[evenType]", eventType );
    if (eventType === "checkout.session.completed") {
      stripe.customers
        .retrieve(data.customer)
        .then(async (customer) => {
          try {
            // console.log(customer);
            // console.log("data", data);
            await createOrder(customer, data);
          } catch (err) {
            console.log(typeof createOrder);
            console.log(err);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // Return a 200 response to acknowledge receipt of the event
    res.status(200).end();
  }
);

module.exports = router;
