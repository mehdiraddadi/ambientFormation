(function(){
    var a = "jean";
    (function (){
        var a = "jacques";
        var b = "pierre";
        if (true){
            let b = "patrick";
            var c = "robert";
        }
        console.log(a, b , c)
    })()

})()