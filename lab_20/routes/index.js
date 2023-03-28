const express = require('express')

const itemsRouter = require('./itemsRouter')
const measureUnitsRouter = require('./measureUnitsRouter')
const clientsRouter = require('./clientsRouter')
const providersRouter = require('./providerRouter')
const deliveriesRouter = require('./deliveriesRouter')
const documentsRouter = require('./documentsRouter')
const purchasesRouter = require('./purchasesRouter')
const employeesRouter = require('./employeeRouter')

const router = express.Router()

router.use('/items', itemsRouter)
router.use('/units', measureUnitsRouter)
router.use('/clients', clientsRouter)
router.use('/providers', providersRouter)
router.use('/deliveries', deliveriesRouter)
router.use('/documents', documentsRouter)
router.use('/purchases', purchasesRouter)
router.use('/employees', employeesRouter)

module.exports = router
