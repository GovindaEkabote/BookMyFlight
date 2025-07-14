const { MaintenanceController } = require('../controllers');

module.exports ={
    AirPlaneMiddleware : require('./airplane-middleware'),
    rateLimiter:require('./rateLimit'),
    bulkCreateorValidator:require('./bulkAirplanesCreater-middleware'),
    bulkUpdateValidator:require('./bulkAirplanesUpdate'),
    MaintenanceValidator:require('./maintenance-middleware')
}