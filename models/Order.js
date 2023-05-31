import {Schema, model} from 'mongoose';

//schema: what will our data look like?
const orderSchema = new Schema({
    dateCreated:{type:Date, default:Date.now},
    orderDescription:{type:String, required:true},
    totalPrice:{type:Number, required:true},
    vat:{type:Number, required:true},
    totalPriceInclVat:{type:Number, required:true},
    user:{type:Schema.Types.ObjectId, ref:'user'}, //storing the _id of the user document here
    products:[{type:Schema.Types.ObjectId, ref:'product'}] //array of object Id's (in this case _id of product documents)
});
//create a model based on the schema we can us to make queries.
const Order = model('order', orderSchema);

export default Order;