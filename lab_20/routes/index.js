const express = require('express')

const itemsRouter = require('./itemsRouter')
const measureUnitsRouter = require('./measureUnitsRouter')
const clientsRouter = require('./clientsRouter')
const providersRouter = require('./providerRouter')

const router = express.Router()

router.use('/items', itemsRouter)
router.use('/measure-units', measureUnitsRouter)
router.use('/clients', clientsRouter)
router.use('/providers', providersRouter)

module.exports = router
