let fs = require('fs')
let files = fs.readdirSync(__dirname + '/files/')

files.forEach((file) => {
    const contents = fs.readFileSync(`${__dirname}/files/${file}`, 'utf8')
    console.log(contents)

    // lecture de fichier asynchone
    fs.readFile(`${__dirname}/files/${file}`, 'utf8', (err, file) => {
        console.log('**********lecture de fichier asynchone******************')
        console.log(err, file)
    })
})


