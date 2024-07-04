import express from 'express';
import {createOrder} from '../Controllers/checkoutController.js'


const router =express.Router();

router.post('/payment',createOrder);

module.exports={router};