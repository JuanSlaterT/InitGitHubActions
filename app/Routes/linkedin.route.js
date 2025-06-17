const express = require('express')
const LinkedinController = require('../Controllers/linkedin.controller')
const linkedGetController = require('../Controllers/linkedIntegration.controller')
const router = express.Router()

router.get(
    '/',
    LinkedinController.getLinkedin
)

router.get(
    '/getLinkedin',

    linkedGetController.handler
)

module.exports = router
