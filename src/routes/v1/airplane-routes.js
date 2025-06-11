const express = require('express')
const router = express.Router()
const {AirPlaneController} = require('../../controllers')

// /api/v1/airplanes/register : POST
router.post('/register', AirPlaneController.createAirplane)



module.exports = router;