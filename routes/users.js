const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const flash = require('connect-flash');
const {check, validationResult} = require('express-validator/check');
const passport = require('passport');

//bring in users model
let User = require('../modeldb/user');

//register form 
router.get('/register', (req,res)=>{
    res.render('register');
});

router.post('/register',
    [ check('name').not().isEmpty().withMessage('Name is required'),
      check('email').not().isEmpty().withMessage('email is required'),
      check('username').not().isEmpty().withMessage('Username is required'),
      check('password').not().isEmpty().withMessage('password is required'),
      check('password2').custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password does not match');
        } else {
            return true;
        }
    }),
    ],(req,res)=>{
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('register',{
        errors:errors.array()
    });
    } else {
        const name = req.body.name;
        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;
        let newUser = new User({
            name:name,
            email:email,
            username:username,
            password:password,
        })  
  
    //bcrypt the password
bcrypt.genSalt(10, function(err, salt){
    bcrypt.hash(newUser.password, salt, (err, hash)=>{
        if(err){
            console.log(err);
        }
        newUser.password = hash;
        newUser.save((err) =>{
            if(err){
                console.log(err);
                return;
            } else {
                req.flash('success','You are now registered and can log in!');
                res.redirect('/users/login');
            }
        });
    });
});
    }
});

//login form
router.get('/login', (req,res)=>{
    res.render('login');
});

//login process
router.post('/login', function(req,res,next){
    passport.authenticate('local', { 
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true 
})(req,res,next);
});

//logout
router.get('/logout',(req,res)=>{
    req.logout();
    req.flash('success','You are logged out');
    res.redirect('/users/login');
})

module.exports = router;