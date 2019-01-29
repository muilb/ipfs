/**
 * Created by lebamui on 13/01/2019.
 */
const elasticClient = require('./elastic-client');
const moment = require('moment');
const indexName = 'callmethod';
const type = 'gethash';

function index(params, cb) {
    if(!params) return false;
    var time = moment.utc().toISOString();

    var body = {
        timestamp: time,
        address: params.address,
        excutor: params.excutor,
        type: params.type,
        method: params.method,
        totaltime: parseInt(params.totaltime)
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
