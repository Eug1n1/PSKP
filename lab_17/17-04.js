const redis = require('redis')
const { performance, PerformanceObserver } = require('perf_hooks')

const perfObserver = new PerformanceObserver((items) => {
    items.getEntries().forEach((entry) => {
        console.log(entry)
    })
})
perfObserver.observe({ entryTypes: ['measure'], buffer: true })

const client = redis.createClient({ url: 'redis://localhost:6379/' })

client.on('connect', () => {
    console.log('connected')
})

client.on('error', (err) => {
    console.log(err)
})

let hsetTesting = async () => {
    for (let i = 0; i < 10000; i++) {
        await client.hSet(
            'hset',
            `${i}`,
            JSON.stringify({ id: i, val: `val - ${i}` })
        )
    }
}

let hgetTesting = async () => {
    for (let i = 0; i < 10000; i++) {
        await client.hGet(
            'hset',
            `${i}`
        )
    }
}

let testPerfomance = async (label, func) => {
    try {
        performance.mark('func-start')
        await func()
    } catch (err) {
        console.log(err)
    } finally {
        performance.mark('func-end')
        performance.measure(label, 'func-start', 'func-end')
    }
}

client.connect().then(async () => {
    await testPerfomance('hset', hsetTesting)
    await testPerfomance('hget', hgetTesting)

    for (let i = 0; i < 10000; i++) {
        await client.hDel('hset', `${i}`)
    }

    console.log(await client.hGetAll('hset'))

    client.quit()
})
