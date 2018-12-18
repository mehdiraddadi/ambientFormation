const mongose = require('mongoose')
mongose.connect('mongodb://localhost:27017/mongose') 
mongose.connection
.on('connected', function(){
    console.log('Mongose default connection open to db')
})

mongose.connection
.on('error', function(err) {
    console.log('Mongose default connection error:' + err)
})

var schem = new mongose.Schema({name: 'string', size: 'string'})
var tank = mongose.model('Tank', schema)
console.log(Tank)