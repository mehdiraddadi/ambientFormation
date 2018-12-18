var fs = require('fs');
var readline = require('readline');
var Product = require('../modele/Products')

var Prodducts = {
    readFileProducts: function(cb) {
        fs.readFile('./mock/products.json', 'utf8',  function(err, data) {
            if (err) throw err; // we'll not consider error handling for now
            var products = JSON.parse(data);
            cb(products)
        });
    },
    orderProductById: function(id, cb) {
        Product.find({ id: id }, function(err, product) {
            if (err) throw err;
            // show the one product
            product[0].orders_counter++;
            cb(product[0])
         });

        /* Prodducts.readFileProducts(function(products){
            var element = products.find(function(product) {
                return product.id = id;
              });
              element.orders_counter++;
              cb(element) */
              //fs.writeFile('./mock/products.json', JSON.stringify(products), function(err) {
               // if(err) {
               //     return console.log(err);
               // }
               // console.log(`Commande terminée, Voici votre fichier: ${element.file_link}`)
             // })
       /*  }) */
    },
    getAllProducts: function() {
        Prodducts.readFileProducts(function(products){
            console.log("Bienvenue, Voici les produits disponibles :")
            if(products != null) {
                products.forEach(product => {
                    console.log(product.id + ' - ' + product.name + ' / ' + product.USD_price + ' / ' + product.orders_counter)
                });
            }
        })
       
    }    

}

module.exports = Prodducts;
