const express = require('express');
const {infoControllers} = require('../../controllers') 

const router = express.Router();

router.get('/info',infoControllers.info)


module.exports = router