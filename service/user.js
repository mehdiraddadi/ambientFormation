var fs = require('fs');
var Product = require('../modele/Users')

var UserService = {
   getUserByUsernamePassword : function(username, password){
        return new Promise(function(resolve, reject) {
            User.find({ username: username, password: password }, function(err, user) {
                if(err) throw reject(err);
        
                if(!Object.keys(user).length) {
                    resolve('user not found!')
                } else {
                   resolve(user)
                }
            })
        })
    
   }
}

module.exports = UserService;
