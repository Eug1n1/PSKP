// import { PrismaClient } from '@prisma/client'
const PrismaClient = require('@prisma/client').PrismaClient
const express = require('express')

const prisma = new PrismaClient()

const app = express()

const getRouter = require('./getRouter')

app.use('/', getRouter)


app.listen(process.env.PORT)
