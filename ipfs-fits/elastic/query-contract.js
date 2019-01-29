/**
 * Created by lebamui on 16/01/2019.
 */
const elasticClient = require('./elastic-client');
const moment = require('moment');
var BoolBuilder = require('./ulity/bool-query');

const indexName = 'contract';
const type = 'contract';

function query(params, cb) {
    var boolQuery = new BoolBuilder();
    var from = params.from || 0;
    var size = params.size || 5;

    // if (params.all) {
    //     boolQuery.isMatchAll = true;
    // }
    boolQuery.isMatchAll = true;
    var sort = [
        {
            "timestamp": {
                "order": 'desc'
            }
        }
    ];
    elasticClient.search({
        index: indexName,
        type: type,
        body: {
            from: from,
            size: size,
            query: boolQuery.getQuery(),
            sort: sort
        }
    }, function (err, respond) {
        // cb(err, respond);
        if (err) {
            cb(err);
            return;
        } else {
            cb(null, respond.hits.hits)
        }
    });
}

module.exports = query;