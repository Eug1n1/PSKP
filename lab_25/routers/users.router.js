import { Router } from 'express'
import { usersController } from '../controllers/index.js'

const router = Router()

router.get('/', async function (req, res) {
    usersController.findAll(req, res)
})

router.get('/:id', function (req, res) {
    usersController.findOne(req, res)
})

export default router
