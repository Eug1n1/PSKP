const Server = require('rpc-websockets').Server
const readline = require('readline');

const server = new Server({port: 4000})
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: `~>`
});

server.event('A')
server.event('B')
server.event('C')

rl.prompt();
rl.on('line', (line) =>
{
    let args = line.split(' ')
    switch (args[0]) {
        case 'A':
            server.emit('A')
            break;
        case 'B':
            server.emit('B')
            break;
        case 'C':
            server.emit('C')
            break;
    }
    rl.prompt();
})