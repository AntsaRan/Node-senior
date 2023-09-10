const express = require('express');

const router = express.Router();

const airParis_Ctrl = require('../controller/airParis_Ctrl');

router.get('/airPollutionparis',airParis_Ctrl.getPollutionParisMin);

router.get('/highestPollution',airParis_Ctrl.getHighestPollutionDate);
module.exports = router;