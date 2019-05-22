let mongoose = require('mongoose');

let orderSchema = mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId,ref:'User'},
    cart:{type:Object,required:true},
    name:{type:String,required:true},
    paymentId:{type:String,required:true},
});

const Order = module.exports = mongoose.model('Order',orderSchema);