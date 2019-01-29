/**
 * Created by lebamui on 28/01/2019.
 */
const config = require('../config/config');
const nats = require('../nats/nats-client');

nats.subscribe(config.junctionId, function(msg) {
    console.log(msg);
});