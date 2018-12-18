function OldHorse() {
    this.age = 0;

    // function fléchées permet de conserver le scope parent(this)
    setInterval(()=>{
        this.age++;
        console.log('Old horse is', this.age)
    }, 1000)
}

var p = new OldHorse();


// babel Input  arrow funtion

//babel Output equivalent