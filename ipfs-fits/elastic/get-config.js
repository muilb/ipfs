/**
 * Created by lebamui on 28/05/2018.
 */
var config = require('../config/config');

module.exports = {
    elasticHost: [
        {
            host: config.elastic.host,
            auth: config.elastic.auth,
            protocol: 'http',
            port: config.elastic.port
        }
    ]
}