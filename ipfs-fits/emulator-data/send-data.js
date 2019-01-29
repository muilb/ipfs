/**
 * Created by lebamui on 27/01/2019.
 */
/**Send data to demo nats server
 * */
// var sleep = require('sleep');
const config = require('../config/config');
const random = require('../tools/random');
const moment = require('moment');

var NATS = require('nats');

var nats = NATS.connect({'servers': config.natsServers});

nats.on('connect', function(subNats) {
    console.log('connected');
});

nats.on('disconnect', function() {
    console.log('disconnect')
});

nats.on('error', function(err) {
    console.log('error', err);
});

console.log('id \t', config.junctionId);
function emulator() {
    var i;
    var rand = random(50, 1000);
    function randomSize() {
        // dosomething(rand);
        sendData();
        rand = random(50, 5000);
        clearInterval(i);
        i = setInterval(randomSize, rand);
    }

    i = setInterval(randomSize, rand);
}

function dosomething(rand) {
    // console.log(rand)
    console.log('Publish to nats:\t', moment.utc().toISOString());
}

function sendData() {
    var sig = require('./random-data');
    sig.timestamp = moment.utc().toISOString();
    nats.publish(config.junctionId, JSON.stringify(sig), function () {
        dosomething();
    });
    // nats.publish('muilb', sig);
}

module.exports = emulator;