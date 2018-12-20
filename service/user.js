var fs = require('fs');
var UserModel = require('../modele/Users')
var Bcrypt = require('bcrypt')

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
    
   },
   saveUser: function(user) {
       const saltRounds = 10
       var password = user.password
       console.log(password)
       Bcrypt.hash(password, saltRounds, function(err, hash) {
           user.password = hash
           console.log(hash)
           var User = new UserModel(user)
           User.save(function (err, userInsert) {
            if (err) return handleError(err);
            console.log('user saverd!')
        })
        // Store hash in your password DB.
      })
   }
}

module.exports = UserService;
