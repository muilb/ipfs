/**
 * Created by lebamui on 11/01/2019.
 */
const fs = require('fs');
const moment = require('moment');
// const solc = require('solc');
const Web3 = require('web3');
const wsprovider = require("./providers").wsprovider;
const config = require('../config/config');

var ipfshashCompiled = require('./contracts/Ipfshash.sol.json');
var abi = ipfshashCompiled.contracts[0].abi;
var bytecode = "0x" + ipfshashCompiled.contracts[0].bytecode;

function createIpfsHashContract(hash, cb) {
    var web3 = new Web3();
    web3.setProvider(wsprovider);
    var BN = web3.utils.BN;

    // deploy contract with contructor
    var ipfsContract = new web3.eth.Contract(abi);
    var startTime = moment.utc().toISOString();
    ipfsContract.deploy({data: bytecode, arguments: [hash]})
        .send({
            from: config.ethAccount,
            gas: 1500000,
            gasPrice: '30000000000000'
        })
        .then(function (deployed) {
            // tien xu ly deployed neu can
            // console.log(deployed.options);
            deployed.options.startTime = startTime;
            deployed.options.owner = config.ethAccount;
            cb(null, deployed);
        })
        .catch(function (err) {
            // console.log(err);
            cb(err);
        });
}

module.exports = createIpfsHashContract;