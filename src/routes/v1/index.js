const express = require('express');
const airPlanesRoutes = require('./airplane-routes') 

const router = express.Router();


router.use('/airplanes',airPlanesRoutes)

module.exports = router