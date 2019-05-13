let mongoose = require('mongoose');

//items Schema
let itemSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    }
});

let items = module.exports = mongoose.model('items',itemSchema);