const Menu = require('../modeldb/items');
const config = require('../config/database');
var mongoose = require('mongoose');
mongoose.connect(config.database,{ useNewUrlParser: true });

let items = [
    new Menu({
        title: 'flat white',
        cupSize: 'small',
        description: 'write your customization here',
        price: 3
    }),
    new Menu({
        title: 'flat white',
        cupSize: 'medium',
        description: 'write your customization here',
        price: 4
    }),
    new Menu({
        title: 'flat white',
        cupSize: 'large',
        description: 'write your customization here',
        price: 5
    }),
    new Menu({
        title: 'latte',
        cupSize: 'small',
        description: 'write your customization here',
        price: 3
    }),
    new Menu({
        title: 'latte',
        cupSize: 'medium',
        description: 'write your customization here',
        price: 4
    }),
    new Menu({
        title: 'latte',
        cupSize: 'large',
        description: 'write your customization here',
        price: 5
    }),
    new Menu({
        title: 'cake',
        cupSize: '-',
        description: 'sweet carrot cake',
        price: 7
    }),
    new Menu({
        title: 'preztel',
        cupSize: '-',
        description: 'original',
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