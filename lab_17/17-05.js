const redis = require('redis')

const client = redis.createClient({ url: 'redis://localhost:6379' })

if (process.argv.length === 2) {
    console.error('no channel specified')
    process.exit(1)
}

let channel = process.argv[2].toString()
let i = 0

client.connect().then(() => {
    setInterval(async () => {
        client.publish(
            channel,
            `message ${i++} from user_id=${await client.clientId()}`
        )
    }, 1000)
})
