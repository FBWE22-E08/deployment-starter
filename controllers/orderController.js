import { StatusCodes } from "http-status-codes";
import Order from "../models/Order.js"
import Product from "../models/Product.js"

/**
 * Controller method that lists all the orders
 * @param {*} req 
 * @param {*} res 
 */
export const listOrders = async(req, res) => {
    try {
      //populate both user and products (embed those documents into the order document by reference)
      const listOrders = await Order.find().populate('user').populate('products');
      return res.status(StatusCodes.OK).json(listOrders);

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:error.toString()})
    }
}

/**
 * Controller method that lists all the orders by user id
 * @param {*} req 
 * @param {*} res 
 */
export const listOrdersByUserId = async(req, res) => {
    try {
      const listOrders = await Order.find({user:req.params.userid}).populate('user'); 
      return res.status(StatusCodes.OK).json(listOrders);

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:error.toString()})
    }
}

/**
 * Controller method to create a new order
 * @param {*} req 
 * @param {*} res 
 */
export const createOrder = async(req, res) => {
   //find all products using the $in operator: 
   //$in = selects all documents where the value of vield equals any of the values in the array
   //In this case we ask to find all products that have a matching _id inside the array. 
   const productsOrdered = await Product.find({_id: {$in:req.body.products}})

   //reduce our array of products to the totalprice
   const totalPrice = productsOrdered.reduce((accumulator, product)=> accumulator + product.price,0)
   const vat = (totalPrice * 0.19).toFixed(2);    //calculate VAT
   const totalPriceInclVat = totalPrice + +vat;   //calculate the totalprice including vat

   try {
    //Create the order
    const createdOrder = await Order.create({
        orderDescription:req.body.orderDescription,
        totalPrice:totalPrice,
        vat:vat,
        totalPriceInclVat:totalPriceInclVat,
        user:req.body.user,
        products:req.body.products
    });

    return res.status(StatusCodes.OK).json({message:'Order was created', createdOrder})

   } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:error.toString()})
   }
}