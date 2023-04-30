import { Router } from 'express'

import { controller } from '../controllers/commits.controller.js'
import { jwtStrategy } from '../strategies/jwt.strategy.js'

const router = Router()

router.get('/:repoId/commits', function (req, res) {
    controller.findAll(req, res)
})

router.get('/:repoId/commits/:commitId', function (req, res) {
    controller.findOne(req, res)
})

router.post('/:repoId/commits', jwtStrategy, function (req, res) {
    controller.create(req, res)
})

router.put('/:repoId/commits/:commitId', jwtStrategy, function (req, res) {
    controller.update(req, res)
})

router.delete('/:repoId/commits/:commitId', jwtStrategy, function (req, res) {
    console.log(1)
    controller.delete(req, res)
})

export default router
