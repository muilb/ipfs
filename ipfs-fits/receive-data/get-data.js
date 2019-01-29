/**
 * Created by lebamui on 27/01/2019.
 */
const config = require('../config/config');
const fs = require("fs");
var NATS = require('nats');
const moment = require('moment');
const stream = require("stream");
const pubFile = require('../ipfs/publish-file');
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
function getData() {
    var filenameDynamic, wf;
    var passStream = new stream.PassThrough();
// Simple Subscriber
    nats.subscribe(config.junctionId, function(msg) {
        console.log(msg);
        var msgJson = JSON.parse(msg);
        var time = moment.utc(msgJson.timestamp).format(config.formatString);

        if (time !== filenameDynamic) {
            // goi ham xu ly ipfs
            callback(filenameDynamic, config.ipfs.wait, pubFile);
            // pubFile(filenameDynamic, config.ipfs.wait);


            passStream.unpipe(wf);
            filenameDynamic = time;
            // wfd.close();  // xem lai co can thiet khong
            wf = fs.createWriteStream(config.ipfs.tmpDir + '/' + filenameDynamic, {flags: 'a'});
            passStream.pipe(wf);
        }

        passStream.write(msg + '\n');
    });

    // passStream.pipe(process.stdout);
}

function callback(path, interval, cb) {
    cb(path, interval);
}

module.exports = getData;