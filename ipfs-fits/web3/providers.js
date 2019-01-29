/**
 * Created by lebamui on 07/01/2019.
 */
var config = require("../config/config");
const Web3 = require('web3');
var wsoptions = {
    // headers: {
    //      Origin: "http://localhost"
    // }
};
const ws = new Web3.providers.WebsocketProvider(config.wsURL, wsoptions);

module.exports = {
    "wsprovider": ws
}