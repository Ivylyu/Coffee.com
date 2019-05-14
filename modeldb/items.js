let mongoose = require('mongoose');

//items Schema
let itemSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{ 
        type:Number,
        required:true
    }
});

let items = module.exports = mongoose.model('items',itemSchema);