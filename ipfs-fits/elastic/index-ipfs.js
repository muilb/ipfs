/**
 * Created by lebamui on 13/01/2019.
 */
const elasticClient = require('./elastic-client');
const moment = require('moment');
const indexName = 'ipfs';
const type = 'ipfs';

function index(ipfs, cb) {
    if(!ipfs) return false;
    var time = moment.utc().toISOString();

    var body = {
        timestamp: time,
        files: ipfs.files,
        totaltime: parseInt(ipfs.totaltime)
    };

    elasticClient.index({
        index: indexName,
        type: type,
        body: body
    }, function (err, resp) {
        cb(err, resp);
    });
}

module.exports = index;
