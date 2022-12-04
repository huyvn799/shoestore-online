const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

// router.post("/payment", async (req,res) => {
//     stripe.charges.create({ 
//         source: req.body.tokenId,
//         amount: req.body.amount,
//         currency: "usd",
//     }, (stripeErr, stripeRes) => {
//         if (stripeErr) {
//             return res.status(500).json(stripeErr);
//         }

//         res.status(200).json(stripeRes);
//     })
// });


router.post('/checkout', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'T-shirt',
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });
  
    res.send({url: session.url});
  });

module.exports = router;