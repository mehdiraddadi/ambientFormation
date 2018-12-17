var fs = require('fs');

fs.readFile('./mock/products.json', 'utf8', function (err, data) {
    if (err) throw err; // we'll not consider error handling for now
    var obj = JSON.parse(data);
    console.log(obj)
});


