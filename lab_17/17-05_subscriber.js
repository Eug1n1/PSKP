const redis = require('redis')

const client = redis.createClient({ url: 'redis://localhost:6379'})

client.connect().then(() => {
    client.pSubscribe('channel*', (message, channel) => {
        console.log(`${channel}: '${message}'`)
    })
})
