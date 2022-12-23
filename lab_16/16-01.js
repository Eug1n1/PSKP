const http = require('http')
const fs = require('fs')
const { graphql } = require('graphql')

let rootValue = require('./resolvers')
let typeDefs = fs.readFileSync('./schema.graphql').toString()

let schema = require('@graphql-tools/schema').makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: rootValue,
})

http.createServer((req, res) => {
    let data = ''

    req.on('data', (chunk) => {
        data += chunk
    })

    req.on('end', () => {
        data = JSON.parse(data)
        res.setHeader('Content-Type', 'application/json')

        graphql({
            schema: schema,
            source: data.query,
            rootValue: undefined,
        })
            .then((response) => {
                res.end(JSON.stringify(response))
            })
            .catch((e) => {
                res.end(JSON.stringify(e))
            })
    })
}).listen(3000)
