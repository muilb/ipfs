/**
 * Created by lebamui on 13/01/2019.
 */
var elasticsearch = require('elasticsearch');

var elsClient = new elasticsearch.Client({
    host: require('./get-config').elasticHost,
    // log: 'trace'
});
module.exports = elsClient;