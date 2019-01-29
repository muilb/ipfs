/**
 * Created by lebamui on 13/01/2019.
 */
const elasticClient = require('./elastic-client');
const moment = require('moment');
const indexName = 'contract';
const type = 'contract';

function index(contract, cb) {
    if(!contract) return false;
    var time = moment.utc().toISOString();

    var body = {
        timestamp: time,
        address: contract.address,
        owner: contract.owner,
        type: contract.type,
        totaltime: parseInt(contract.totaltime)
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
