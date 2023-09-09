const axios = require('axios');
const config = require('../utils/config');
const apiKey = config.apiKey;
const apiUrl = config.apiUrlSimple;
const paris = config.parisLatLong;
const Pollution = require('../model/pollution');

exports.getPollutionLatLong = async (lat, long, cb) => {
    const url = `${apiUrl}?lat=${lat}&lon=${long}&key=${apiKey}`;
    if (lat && long) {
        try {
            const response = await axios.get(url);
            const data = response.data;
            console.log(data.data.current);
            cb(data);
        } catch (error) {
            throw error;
        }
    }
}

exports.getPollutionParisAPI = async (cb) => {

    const latParis = paris.lat;
    const longParis = paris.long;
    const url = `${apiUrl}?lat=${latParis}&lon=${longParis}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const data = response.data;
        console.log(data.data.current);
        cb(data.data.current.pollution);
    } catch (error) {
        throw error;
    }

}

exports.getHighestPollutionDateParis = async (cb) => {
    try {
        const dateOfHighest = await Pollution.findOne({})
            .sort({ aqius: -1 })
            .select('ts');
        if (!dateOfHighest) {
            console.log('data not found');
            return null;
        }
       /* const date = dateOfHighest.ts.getFullYear() + "/" + (dateOfHighest.ts.getMonth() + 1) + "/" + dateOfHighest.ts.getDate();
        console.log(date);*/
        cb(dateOfHighest.ts);
    } catch (error) {
        console.error('Error fetching document with highest AQI:', error);
        throw error;
    }

}