// import { PrismaClient } from '@prisma/client'
const PrismaClient = require('@prisma/client').PrismaClient
const express = require('express')

const prisma = new PrismaClient()

const app = express()

const getRouter = require('./getRouter')
const postRouter = require('./postRouter')
const deleteRouter = require('./deleteRouter')

app.use('/', getRouter)
app.use('/', postRouter)
app.use('/', deleteRouter)


app.listen(process.env.PORT)
