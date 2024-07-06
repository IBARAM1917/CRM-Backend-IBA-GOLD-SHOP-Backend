const productModel =require ('../Models/productModel');



exports.getProducts =async (req,res,next) =>{
  const products =await productModel.find({});
  res.json({
    success:true,
    products
  })

}


exports.getSingleProducts =async(req,res,next)=>{
    try{
        const product =await productModel.findById(req.params.id)
        res.json({
            success:true,
            product
        })
    }catch(error){
        res.status(404).json({
            success:false,
            message:"Unable to get with that ID"
        })
    }
}