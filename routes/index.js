const express = require('express');
const router = express.Router();

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
             console.log('Hello!')
             return res.redirect('/')
         } 
         cart.add(item,item.id);
         req.session.cart = cart;
         console.log(req.session.cart);
         res.redirect('/')
     });
 });

module.exports = router;