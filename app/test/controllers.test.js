const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const pollutionService = require('../services/pollution.service');
const app = require('../index');
const lat = 48.73821705900323;
const long = 2.2947057935823456;
chai.use(chaiHttp);
const expect = chai.expect;
const Pollution = require('../model/pollution');
const polController = require('../controller/airParis_Ctrl');
const mongoose = require('mongoose');

describe('Air nearest controller ', function () {
    before(function (done) {
        // Connect to the database only once before running the tests
        if (mongoose.connection.readyState === 0) {
            mongoose
                .connect(
                    'mongodb+srv://antsa:IqairNode@cluster0.wb4lahp.mongodb.net/test_db?retryWrites=true&w=majority'
                )
                .then(() => {
                    console.log("Connected to the database");
                    done();
                })
                .catch(err => {
                    console.error(err);
                    done(err);
                });
        } else {
            console.log("Database already connected");
            done();
        }

    });

    it('should send an error message if no data is retrieved', function (done) {
        const mockGetData = sinon.stub(pollutionService, 'getPollutionLatLong');
        mockGetData.callsFake((lat, long, callback) => {
            callback(null);
        });

        chai.request(app)
            .get(`/airnearest/nearest/${lat}/${long}`)
            .end((err, res) => {
                expect(res.text).to.equal('An error occurred.');
                mockGetData.restore();
                done();
            });
    });
    
    it('should add AIQ of Paris in DB', async function (){
        this.timeout(8000);
        const req = {};
        const res = {
            send: sinon.stub(),
            status: sinon.stub()
        };
        const pollutionTest = {
            ts: '2023-09-09T15:00:00.000Z',
            aqius: 46,
            mainus: 'p2',
            aqicn: 16,
            maincn: 'p2'
        };
        const mockGetData = sinon.stub(pollutionService, 'getPollutionParisAPI').callsFake(callback => {
            callback(pollutionTest);
        });
        
        await polController.getpollutionParis(req, res);
        const savedPollution = await Pollution.findOne({
            ts: '2023-09-09T15:00:00.000Z',
            aqius: 46,
            mainus: 'p2',
            aqicn: 16,
            maincn: 'p2'
        });
        expect(savedPollution).to.exist;
        expect(savedPollution.aqius).to.equal(46);
        mockGetData.restore();
    });

    after(function(done) {
        Pollution.deleteMany({})
          .then(() => {
            return mongoose.disconnect();
          })
          .then(() => {
            done();
          });
      });
})

