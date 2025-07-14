const express = require('express');
const airPlanesRoutes = require('./airplane-routes') 
const maintenanceRoutes = require('./maintenance-routes')

const router = express.Router();


router.use('/airplanes',airPlanesRoutes)
router.use('/maintenance',maintenanceRoutes)

module.exports = router