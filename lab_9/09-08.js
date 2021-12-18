/*
const http = require('http')
const multiparty = require("multiparty");

const options = {
    hostname: 'localhost',
    port: 3000,
    method: 'GET'
}

const req = http.request(options, res => {

    console.log(res.statusMessage)
    console.log(res.statusCode)

    let form  = new multiparty.Form({uploadDir: './static'})
    let result = ''

    form.on('field', (name, value) =>
    {
        console.log(name, value)
        result += `${name} = ${value}\n`
    })

    form.on('file', (name, file) =>
    {
        console.log(name, file)
        result += `${name} = ${file.originalFilename} : ${file.path}`
    })

    form.on('error', (err) =>
    {
        console.log(err)
    })

    form.on('close', () =>
    {
        console.log(result)
    })

    form.parse(res)

    res.on('data', d => {
        process.stdout.write(d)
    })
})

req.on('error', error => {
    console.error(error)
})

req.end()
*/

const axios = require('axios')
const fs = require('fs')

async function getImage() {
  try {
    let config = {
      responseType: 'stream'
    }

    let response = await axios.get('http://localhost:3000/', config)
    console.log(response.status)
    response.data.pipe(fs.createWriteStream('./static/file.txt'))
  } catch (e) {
    console.log(e)
  }
}

getImage()
