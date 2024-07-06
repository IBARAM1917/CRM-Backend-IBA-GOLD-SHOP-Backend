const express =require("express")
const app=express()
require("dotenv").config()

const stripe =require("stripe")(process.env.STRIPE_SECRET_TEST)
const bodyParser =require("body-parser")
const cors =require("cors")

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use(cors());

const payment= async (req,res)=>{
  let {amount,id}=req.bodyParser
  try{
  const  payment =await stripe.paymentIntents.create({
    amount,
    currency:"INR",
    description:"IBA GOLD SHOP",
    payment_method: id,
    confirm:true
  })
  console.log("Payment",payment);
  res.json({
    message:"Payment Successful",
    success:true
  })
  }catch(error){
    console.log("Error",error);
    res.json({
      message:"Payment failed",
      success:false
    })

  }
  app.post('/api/payment',createOrder);
  const PORT =process.env.PORT ||5000;
  app.listen(PORT ,()=>{
    console.log(`Server is listening on port  ${PORT}`);
  })
}
module.exports={payment};