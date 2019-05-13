let mongoose = require('mongoose');

//order schema
let orderSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    }
});

let orders = module.exports = mongoose.model('order',orderSchema);