const express = require('express');
const router = express.Router();
const Cart = require('../modeldb/cart');

//bring in users model
let Menu = require('../modeldb/items');
let Order = require('../modeldb/order');

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
         console.log(item);
         req.session.cart = cart;
         //console.log(req.session.cart);
         res.redirect('/');
     });
 });

 router.delete('/cart/:id',(req,res)=>{
    let pID = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart :{items:{}})
    //let query = {_id:req.params.id}
    req.session.cart = cart;
    res.redirect('/');
    Menu.findById(pID, (err,item) => {
        if(err){
            return res.redirect('/')
        } 
        cart.removeByOne(item,pID);
        console.log(item._id);
        console.log(pID);
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
 });

 router.get('/checkout',(req,res,next)=>{
     if(!req.session.cart) {
         return res.redirect('add_to_cart');
     }
     var cart = new Cart(req.session.cart);
     var errMsg = req.flash('error')[0];
     res.render('checkout',{totalPrice: cart.totalPrice,errMsg:errMsg,noError:!errMsg})
 });

 router.post('/checkout', (req,res,next)=>{
     if(!req.session.cart){
         return res.redirect('/add_to_cart');
     }
     var cart = new Cart(req.session.cart);
     const stripe = require('stripe')('sk_test_7kfobiGnnyU35DV6Nl4c52En00WsMFRDCG');

     // Token is created using Checkout or Elements!
     // Get the payment token ID submitted by the form:
     //req.body.stripeToken
     stripe.charges.create({
         amount: cart.totalPrice * 100,
         currency: 'aud',
         description: 'Example charge',
         source: 'tok_mastercard',
       },function(err,charge){
        if(err){
            req.flash('error',err.message);
            return res.redirect('/checkout');
        } else {
         var order = new Order({
             user:req.user,
             cart:cart,
             name:req.body.name,
             paymentId:charge.id
         });
         order.save((err)=>{
            if(err)
            {
               console.log(req.body);
               return;
            }
            req.flash('success','Successfully bought the product!');
            req.session.cart = null;
            res.redirect('/');   
         })
        }
       });
 })
module.exports = router;