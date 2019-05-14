const User = require('../modeldb/user');
const config = require('../config/database');
var mongoose = require('mongoose');
mongoose.connect(config.database,{ useNewUrlParser: true });

let users = [
    new User({
        name: 'Ivy',
        email: 'erer1995@outlook.com',
        username: 'Ivy',
        password:12345
    })];

var done = 0;
for(i=0;i<users.length;i++){
    users[i].save(function(err,result){
        done++;
        if(done === users.length){
            exit();
        }
    });
};

function exit(){
    mongoose.disconnect();
}