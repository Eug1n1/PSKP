const readline = require('readline')
const http = require('http')

let state = "norm"

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: `${state}->`
})


http.createServer(function(_request, response) {
  response.writeHead(200, { 'Content-Type': 'text/html' })
  response.end(`<h1>${state}</h1>`)
}).listen(3000)


rl.prompt()

rl.on('line', (line) => {
  switch (line.trim()) {
    case 'norm':
    case 'stop':
    case 'test':
    case 'idle':
      console.log(`res = ${state} -> ${line}`)
      state = line
      rl.setPrompt(`${state}->`)
      break
    case 'exit':
      process.exit(0)
      break
    default:
      console.log(line)
      break
  }
  rl.prompt()
})
