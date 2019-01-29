/**
 * Created by lebamui on 27/01/2019.
 */
const config = require('../config/config');
const random = require('../tools/random');
const moment = require('moment');
var sig = {
    "junctionid": config.junctionId,
    "signalgroup": [{
        "sumWaitingTimeQueue": "0",
        "maxQueue": "0",
        "sumGreen": "8",
        "sigId": "8",
        "stopCnt": "0",
        "sumQueue": "0",
        "vehCnt": "0",
        "contrId": "0",
        "duration": "115",
        "sumCycle": "115",
        "cycleCnt": "1",
        "sumDelay": "0.0",
        "wastedGreen": "8",
        "vehsInDilemma": "0"
    }],
    "seq": 1,
    "timestamp": moment.utc().toISOString()
}
function randomData() {
    return {
        "junctionid": config.junctionId,
        "signalgroup": [{
            "sumWaitingTimeQueue": "0",
            "maxQueue": "0",
            "sumGreen": "8",
            "sigId": "8",
            "stopCnt": "0",
            "sumQueue": "0",
            "vehCnt": "0",
            "contrId": "0",
            "duration": "115",
            "sumCycle": "115",
            "cycleCnt": "1",
            "sumDelay": "0.0",
            "wastedGreen": "8",
            "vehsInDilemma": "0"
        }],
        "seq": 1,
        "timestamp": moment.utc().toISOString()
    }

}
module.exports = randomData();