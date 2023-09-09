const Pollution = require('../model/pollution');
const pollutionService = require('../services/pollution.service');
const config = require('../utils/config');
const paris = config.parisLatLong;
const schedule = require('node-schedule');
const bodyParser = require('body-parser');
const io = require('../services/socket');

exports.getPollutionLatLong = (req, res) => {

    const lat = req.params.lat;
    const long = req.params.long;

    pollutionService.getPollutionLatLong(lat, long, data => {
        if (!data) {
           return res.send('An error occurred.')
        }
        const pollution = data.data.current.pollution;
        const pol = new Pollution({
            ts: pollution.ts,
            aqius: pollution.aqius,
            mainus: pollution.mainus,
            aqicn: pollution.aqicn,
            maincn: pollution.maincn
        }
        )
        const response = {
            "result": {
                "pollution": pol
            }
        }
        res.send(JSON.stringify(response));
    })
}
