import { StatusCodes } from "http-status-codes"
import Product from "../models/Product.js"

/**
 * Controller method to list all products
 * @param {*} req 
 * @param {*} res 
 */
export const listProducts = async(req, res) => {
    try {
       console.log("the user who made the request is", req.user);

       const products = await Product.find(); 

        return res.status(StatusCodes.OK).json(products);

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:error.toString()})
    }
}


/**
 * Controller method to create a new product.
 * @param {*} req 
 * @param {*} res 
 */
export const createProduct = async(req, res) => {
    try {
        const createdProduct = await Product.create({
            productName:req.body.productName,
            productDescription:req.body.productDescription,
            price:req.body.price
        });

        return res.status(StatusCodes.CREATED).json({message:'Product created', createdProduct})

    } catch (error) {
     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:error.toString()})
    }
}

export default {createProduct, listProducts}