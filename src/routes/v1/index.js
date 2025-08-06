const express = require('express');
const airPlanesRoutes = require('./airplane-routes') 
const maintenanceRoutes = require('./maintenance-routes')
const users = require('./users-routes')

const router = express.Router();


router.use('/airplanes',airPlanesRoutes)
router.use('/maintenance',maintenanceRoutes)
router.use('/users',users)

module.exports = router