try{
    const a = 1;
    a = 2;
    console.log(a)
    console.log("ok")
}catch(e){
    console.log(e)
}

try{
    const a = {b: 1};
    a.b = 2;
    console.log(a)
    console.log("ok")
}catch(e){
    console.log(e)
}