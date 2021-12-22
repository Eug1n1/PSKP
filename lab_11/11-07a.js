const Client = require('rpc-websockets').Client
const readline = require('readline');

const client = new Client('ws://localhost:4000/')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: `~>`
});

client.on('open', () =>
{
    rl.prompt();
    rl.on('line', (line) =>
    {
        let args = line.split(' ')
        switch (args[0]) {
            case 'A':
                client.notify('A')
                break;
            case 'B':
                client.notify('B')
                break;
            case 'C':
                client.notify('C')
                break;
            default:
                client.notify('ALL')
        }
        rl.prompt();
    })
})

