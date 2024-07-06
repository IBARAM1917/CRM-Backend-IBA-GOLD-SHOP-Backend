const { default: mongoose } = require('mongoose');
const  moongoose =require ('mongoose');

const productSchema =new moongoose.Schema({
    name:String,
    price:String,
    description:String,
    rating:String,
    image:[ String ],
    category:String,
    seller:String,
    numOfReviews:String,
    createAt:Date
});
const productModel =mongoose.model('product',productSchema);

module.exports=productModel;