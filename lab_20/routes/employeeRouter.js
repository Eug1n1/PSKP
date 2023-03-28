const express = require('express')

const controller = require('../controllers/employeesController')

const router = express.Router()

router.get('/', controller.getAll)
router.get('/:id', controller.getOneById)
router.post('/', controller.create)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)

module.exports = router
