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

let setTesting = async () => {
    for (let i = 0; i < 10000; i++) {
        await client.set(`${i}`, `set${i}`)
    }

    console.log('set block done')
}

let getTesting = async () => {
    for (let i = 0; i < 10000; i++) {
        await client.get(`${i}`, `set${i}`)
    }

    console.log('set block done')
}

let delTesting = async () => {
    for (let i = 0; i < 10000; i++) {
        await client.del(`${i}`, `set${i}`)
    }

    console.log('set block done')
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
    await testPerfomance('setTesting', setTesting)
    await testPerfomance('getTesting', getTesting)
    await testPerfomance('delTesting', delTesting)

    client.quit()
})
