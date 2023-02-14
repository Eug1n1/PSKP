const redis = require('redis')

let client = redis.createClient({ url: 'redis://localhost:6379/'})

client.on('connect', () => {
    console.log('connected')
})

client.on('error', (err) => {
    console.log(err)
})

client.connect().then(() => {
    client.quit()
})
