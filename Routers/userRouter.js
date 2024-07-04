const express =require ('express');
const { postquery } = require('../Controllers/userControllers');


const router =express.Router();


router.post('/postquery',postquery);



module.exports={router};