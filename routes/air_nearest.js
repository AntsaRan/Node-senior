const express = require('express');

const router = express.Router();

const air_nearestController = require('../controller/air_nearest_Ctrl');

router.get('/nearest/:lat/:long',air_nearestController.getPollutionLatLong);

module.exports = router;