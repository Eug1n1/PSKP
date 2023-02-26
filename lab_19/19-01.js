// import { PrismaClient } from '@prisma/client'
const PrismaClient = require('@prisma/client').PrismaClient
const express = require('express')

const prisma = new PrismaClient()

const app = express()

const getRouter = require('./getRouter')
const postRouter = require('./postRouter')

app.use('/', getRouter)
app.use('/', postRouter)


app.listen(process.env.PORT)
