import express from 'express';
import { createOrder, listOrders, listOrdersByUserId } from '../controllers/orderController.js';

const router = express.Router();

//GET:: http://localhost:3001/api/orders/list
router.get('/list', listOrders);

//GET:: http://localhost:3001/api/orders/byuser/:userid 
router.get('/list/byuser/:userid', listOrdersByUserId);

//POST:: http://localhost:3001/api/orders/create 
//EXAMPLE JSON - BODY
//{
//	"orderDescription":"Order Webshop", 
//	"user":"<ADD USER ID HERE>",
//	"products":["<ADD PRODUCT ID HERE","<ADD PRODUCT ID HERE>"]
//}
router.post('/create', createOrder);

export default router;