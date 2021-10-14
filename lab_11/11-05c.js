const {cursorTo} = require("readline");
const rpc = require('rpc-websockets').Client

const client = new rpc('ws://localhost:4000/')

client.on('open', async () => {

    let sumArr = []

    sumArr.push(await client.call('square', [3]))
    sumArr.push(await client.call('square', [5,4]))
    sumArr.push(await client.call('mul', [3, 5, 7, 9, 11, 13]))

    console.log(sumArr)

    let sum = await client.call('sum', sumArr)
    console.log(sum)

    let fib = []
    await client.login({login: 'smw', password: '777'})
        .then(async isAuth =>
        {
            if (isAuth)
            {
                fib = await client.call('fib', [7])
            }
        })
    console.log(fib)

    fib.push(sum)
    console.log(fib)

    sum = await client.call('sum', fib)
    console.log(sum)

    let mul = await client.call('mul', [2, 4, 6])
    console.log(mul)

    let result = await client.call('mul', [sum, mul])

    console.log(result)

})

client.on('error', (error) =>
{
    console.log(error)
})
