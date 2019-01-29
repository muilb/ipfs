/**
 * Created by lebamui on 28/01/2019.
 */
const config = require('../config/config');
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

module.exports = nats;