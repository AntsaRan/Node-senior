const Pollution = require('../model/pollution');
const pollutionService = require('../services/pollution.service');
const config = require('../utils/config');
const paris = config.parisLatLong;
const schedule = require('node-schedule');
const dbcon = require('../utils/databaseCon');

exports.getPollutionParisMin = (req, res) => {

    let { minute = '', hour = '', dayOfMonth = '', month = '', dayOfWeek = '' } = req.body;

    minute = minute || '*';
    hour = hour || '*';
    dayOfMonth = dayOfMonth || '*';
    month = month || '*';
    dayOfWeek = dayOfWeek || '*';

    const job = schedule.scheduleJob(`${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek} `, () => {
        getpollutionParis(req, res);
    })
    res.status(500).send('Cron Job started');
    1
}
function getpollutionParis(req, res) {
    pollutionService.getPollutionParisAPI(data => {
        if (!data) {
            return res.send('An error occured.')
        }
        const pollution = data;
        console.log(JSON.stringify(pollution) + " pollution e");
        const pol = new Pollution({
            ts: pollution.ts,
            aqius: pollution.aqius,
            mainus: pollution.mainus,
            aqicn: pollution.aqicn,
            maincn: pollution.maincn
        });
        pol.save().then(result => {
            console.log('Created Air info' + result);
            // io.getIO().emit('paris air', JSON.stringify(result));
        }).catch(err => {
            throw new Error(err);
        });
    })
};

exports.getHighestPollutionDate = (req, res) => {
    pollutionService.getHighestPollutionDateParis(data => {
        if (!data) {
            return res.send('An error occured.')
        }
        console.log(data);
        res.send(JSON.stringify(data));
        dbcon.closeDb();
    })
}
exports.getpollutionParis = getpollutionParis;
