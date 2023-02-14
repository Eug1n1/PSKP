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

let incrTesting = async () => {
    for (let i = 0; i < 10000; i++) {
        await client.incr('incr')
    }
}

let decrTesting = async () => {
    for (let i = 0; i < 10000; i++) {
        await client.decr('incr')
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
    await client.set('incr', 1)

    await testPerfomance('incr', incrTesting)
    await testPerfomance('decr', decrTesting)

    client.quit()
})
