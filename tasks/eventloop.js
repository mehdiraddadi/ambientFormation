(function(){
    console.log('STEP0')
    setTimeout(function cb(){
        console.log('Step 1')
    })
    console.log('Step 2')
    
    setTimeout(function cb1(){
        console.log('Step3')
    }, 0)

    console.log('Step4')
})()