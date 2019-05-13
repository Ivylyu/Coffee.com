const express = require('express');
const router = express.Router();


//bring in users model
let Menu = require('../modeldb/items');
let User = require('../modeldb/user');

//add route
router.get('/add',ensureAuthenticated,function(req,res){
    Menu.find({}, (err,items) => {
        if(err){
            console.log(err);
        } else {
        res.render('add_to_cart', {
            title:'Cart',
            Menu: items 
        });
    }
    });
    // res.render('add_to_cart', {
    //     title:'Cart'
    // });
});

//add a submit POST Route
router.post('/add',(req,res)=>{
    let item = new Menu();
    item.title = req.body.title;
    item.body = req.body.body;

    item.save((err)=>{
   if(err)
    {
       console.log(req.body);
       return;
    } else {
        req.flash('success','item dded')
        res.redirect('/');
    }
});
});

//load edit form
router.get('/edit/:id',(req,res)=>{  
    Menu.findById(req.params.id,(err, item)=>{
        res.render('edit_item',{
            title: 'Customize your Coffee',
            item:item
        });
    });
});

//update submit post route
router.post('/edit/:id',(req,res)=>{
    let item = {};
    item.title = req.body.title;
    item.body = req.body.body;

    let query = {_id:req.params.id}

    Menu.updateOne(query, item, (err)=>{
        if(err){
            console.log(err);
            return;
        } else {
            req.flash('success','cart updated');
            res.redirect('/');
        }
    })
});

//Get Singhle item
router.get('/:id',(req,res)=>{
    Menu.findById(req.params.id, (err,item)=>{
        res.render('item', {
            item:item
        });
    });
})

router.delete('/:id',(req,res)=>{
    let query = {_id:req.params.id}

    Menu.remove(query, (err)=>{
        if(err){
            console.log(err);
        }
        res.send('Success');
    });
});

//access control
function ensureAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash('danger','Please login');
        res.redirect('/users/login');
    }
}

module.exports = router;