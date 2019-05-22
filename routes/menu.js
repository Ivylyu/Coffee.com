const express = require('express');
const router = express.Router();

//bring in users model
let Menu = require('../modeldb/items');
let User = require('../modeldb/user');

//add route

router.get('/add',function(req,res){
    Menu.find({}, (err,item) => {
        if(err){
            console.log(err);
        } 
        res.render('item',{
            title: item.title,
            description:item.description,
            price:item.price
        });
    });
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
            title: 'Customize your item',
            item:item
        });
    });
});

//update submit post route
router.post('/edit/:id',(req,res)=>{
    let item = {};
    item.description = req.body.body;
    
    let query = {_id:req.params.id}
    //console.log(req.body.body);

    Menu.updateOne(query, item, (err)=>{
        if(err){
            console.log(err);
            return;
        } else {
            req.flash('success','item updated');
            res.redirect('/menu/'+ query._id);
        }
    })
});

//Get Singhle item
router.get('/:id',ensureAuthenticated,(req,res)=>{
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