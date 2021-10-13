const rpc = require('rpc-websockets').Server

let server = new rpc({port: 4000})

server.setAuth(args =>
{
    return (args.login === 'smw' && args.password === '777')
})

server.register('square', args =>
{
    if (args[1])
    {
        return args[0] * args[1]
    }

    return Math.PI * args[0] ^ 2
}).public()

server.register('sum', args =>
{
    let sum = 0
    for (let argsKey in args) {
        sum += Number(args[argsKey])
    }

    return sum
}).public()

server.register('mul', args =>
{
    let mul = 1
    for (let argsKey in args)
    {
        mul *= Number(args[argsKey])
    }

    return mul
}).public()

server.register('fib', args =>
{
    return fibonacci(args[0])
}).protected()

server.register('fact', args =>
{
    return factorial(args[0])
}).protected()

function fibonacci(n) {
    let i;
    let fib = [];

    fib[0] = 0;
    fib[1] = 1;
    for (i = 2; i < n; i++)
    {
        fib[i] = fib[i - 2] + fib[i - 1];
    }

    return fib
}

function factorial(n) {
    return (n !== 1) ? n * factorial(n - 1) : 1;
}

