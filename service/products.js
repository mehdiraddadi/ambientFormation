var fs = require('fs');
var readline = require('readline');
var Product = require('../modele/Products')
var config = require('../config/config')
var Order = require('../modele/Orders')

var Products = {
    readFileProducts: function(cb) {
        fs.readFile('./mock/products.json', 'utf8',  function(err, data) {
            if (err) throw err; // we'll not consider error handling for now
            var products = JSON.parse(data);
            cb(products)
        });
    },
    orderProductById: function(id, cb) {
        Product.findOne({ id: id }, function(err, product) {
            if (err) throw err;
            // show the one product
            product.orders_counter++;
            product.save(function (err, updatedTank) {
                if (err) return handleError(err);
                console.log('product '+product.id +' updated!')
            });
            cb(product)
         });
    },
    addOrder : async function(id, userId) {
        return new Promise(function(resolve, reject){
            Product.findOne({ _id: id }, function(err, product) {
                if (err) return reject(err)
                var order = new Order({
                    "productId": product._id,
                    "userId" : userId,
                    "orderDate": new Date(),
                    "price": product.USD_price
                })
                order.save(function (err, sevedOrder) {
                    if (err) return handleError(err);
                    console.log('order saved :)')
                    resolve(sevedOrder)
                });                
             });
        })
    },
    getAllProducts: async function() {
        return new Promise(function(resolve, reject) {
             Product.find({}, function(err, data) {
                if (err) throw err;
                resolve(data)
              });
            
        })
    },
    getUserProducts: async function(userId) {
        return new Promise(function(resolve, reject) {
            Order.find({'userId': userId})
            .populate('userId')
            .exec(function(err, orders) {
                if(err) reject(err)
                resolve(orders)
            });
        })
    }    

}

module.exports = Products;
