/* const myPromise = new Promise(function(resolve, reject) {
    setTimeout(() => {
        resolve('fine 1')
    }, 1000)
    reject("bug")
})
.then(function whenOf(res){
    console.log('log 1', res)
    return new Promise(function(resolve, reject){
        setTimeout(() => {
            resolve('fine 2')
        }, 1000)
    }).then(function whenok(res) {
        console.log('log 3 ', res)
        return res;
    })
}).then(function whenok(res) {
    console.log('log 2', res)
}).catch(function notOk(err) {
    console.log(err)
}) */

/* 
new Promise(function(resolve, reject) {
    setTimeout(() => resolve(1), 1000)
})
.then(function(result) {
    console.log(result)
    return new Promise(function(resolve, reject) {
        setTimeout(() => resolve(result + 2), 1000)
    })
})
.then(function(result) {
    console.log(result)
    return new Promise(function(resolve, reject) {
        setTimeout(() => resolve(result + 2), 1000)
    })
})
.then(function(result) {
    console.log(result)
    result + undef
    return new Promise(function(resolve, reject) {
        setTimeout(() => resolve(result + 2), 1000)
    })
})
.catch((e) => {
    console.log("Error caught: ", e)
}) */
console.log('########################################################################################')
var p1 = new Promise((resolve, reject) => {
    setTimeout((param) =>{
        console.log(param)
        resolve(param)
    }, 1000, 'un')
})

var p2 = new Promise((resolve, reject) => {
    setTimeout((param) =>{
        console.log(param)
        resolve(param)
    }, 2000, 'deux')
})

var p3 = new Promise((resolve, reject) => {
    setTimeout((param) =>{
        console.log(param)
        resolve(param)
    }, 3000, 'trois')
})

var p4 = new Promise((resolve, reject) => {
    setTimeout((param) =>{
        console.log(param)
        resolve(param)
    }, 4000, 'quatre')
})

var p5 = new Promise((resolve, reject) => {
    setTimeout((param) =>{
        console.log(param)
        reject('reject')
    }, 2500, 'cinq')
    
})

Promise.race([p1, p2, p3, p4, p5]).then(values => {
    console.log("race then", values)
}).catch(reason => {
    console.log("race catch", reason)
})


const verifyPromise = async function() {
    try{
       const us = await p1()
       const us2 = await p2()
       const us3 = await p3()
       const us4 = await p4()

    } catch(e) {

    }
}