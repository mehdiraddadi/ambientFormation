const dns = require('dns')

dns.lookup('www.google.com', function onLookup(err, address, fmilly) {
    console.log('ip:', address)
    dns.reverse(address, function(err, hostnames) {
        if(err) {
            console.log(err.stack)
        }

        console.log(hostnames)
    })
})