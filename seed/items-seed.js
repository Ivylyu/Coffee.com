const Menu = require('../modeldb/items');
const config = require('../config/database');
var mongoose = require('mongoose');
mongoose.connect(config.database,{ useNewUrlParser: true });

let items = [
    new Menu({
        title: 'flat white',
        description: 'medium',
        price: 5
    }),
    new Menu({
        title: 'latte',
        description: 'medium',
        price: 5
    }),
    new Menu({
        title: 'cake',
        description: 'sweet',
        price: 7
    }),
    new Menu({
        title: 'preztel',
        description: 'small',
        price: 7
    }),
];
var done = 0;
for(i=0;i<items.length;i++){
    items[i].save(function(err,result){
        done++;
        if(done === items.length){
            exit();
        }
    });
};

function exit(){
    mongoose.disconnect();
}