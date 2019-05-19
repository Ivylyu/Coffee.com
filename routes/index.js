const express = require('express');
const router = express.Router();
const Cart = require('../modeldb/cart');

//bring in users model
let Menu = require('../modeldb/items');

//home router
router.get('/', function(req,res){
    Menu.find({}, (err,items) => {
        if(err){
            console.log(err);
        } else {
        res.render('index', {
            title:'Menu',
            Menu: items 
        });
    }
    });
});


router.get('/cart/:id',function(req,res){
    let pID = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart :{items:{}})
     Menu.findById(pID, (err,item) => {
         if(err){
             return res.redirect('/')
         } 
         cart.add(item,item.id);
         req.session.cart = cart;
         //console.log(req.session.cart);
         res.redirect('/');
     });
 });

 router.get('/add_to_cart', (req,res,next) =>{
     if(!req.session.cart){
         return res.render('add_to_cart',{items: null})
     }
     var cart = new Cart(req.session.cart);
     res.render('add_to_cart',{items: cart.generateArray(),totalPrice:cart.totalPrice,totalQty: cart.totalQty})
 })

module.exports = router;