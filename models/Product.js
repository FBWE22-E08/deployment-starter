import {Schema, model} from 'mongoose';

//what will our data look like? 
const productSchema = new Schema({
    createdOn:{type:Date, default:Date.now},
    productName:{type:String, required:true},
    productDescription:{type:String, required:true},
    price:{type:Number, required:true}
});

//model, will be used to maker queries to the database. 
//model is created based on the schema
const Product = model('product',productSchema);

export default Product;