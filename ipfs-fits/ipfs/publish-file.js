/**
 * Created by lebamui on 27/01/2019.
 */
const config = require('../config/config');
// var sleep = require('sleep');
const moment = require('moment');
const fs = require("fs");
const ipfsAPI = require('ipfs-api');
const indexIPFS = require('../elastic/index-ipfs');
const indexContract = require('../elastic/index-contract');
const createContract = require('../web3/contract');
const logs = require('../tools/logs-err');
var ipfs = ipfsAPI({host: config.ipfs.host, port: config.ipfs.port, protocol: 'http'});

function pushFile(path1, interval) {
    const path = path1;
    console.log(path);
    if (path === undefined) {
        return;
    }

    // /** Sleep mot khoang interval by seconds de cho*/
    // sleep.sleep(interval);

    // /**Lay thong so file: dung luong**/
    // var fileSizeInBytes = getFilesizeInBytes(path);
    /** Thoi gian bat dau pub*/
    setTimeout(function () {
        var startTime = moment.utc().toISOString();
        //----Publish
        addFiletoIPFS(path, {startTime: startTime, rm: true}, function (err, res) {
            if (err) {
                console.log(err);
                logs(err);
            } else {
                indexIPFS(res, function (es_err, es_res) {
                    if (es_err) {
                        logs(es_err);
                    } else {
                        // Make contract ? here
                        console.log('indexed ipfs');
                    }
                });

                var hash = res.hash || 'loi tra ve ipfs add function';
                createContract(hash, function (eth_err, eth_res) {
                    if (eth_err) {
                        console.log('Create error\n');
                        logs(eth_err)
                        return;
                    }
                    var createTime = moment.utc() - moment.utc(eth_res.options.startTime);
                    var body = {
                        // timestamp: moment.utc().toISOString(),
                        address: eth_res.options.address,
                        owner: eth_res.options.owner,
                        type: "IPFS",
                        totaltime: createTime
                    }
                    console.log('created at:\t', moment.utc().toISOString(), '\tIndexing ...');
                    indexContract(body, function (es_err, es_res) {
                        if (err) {
                            console.log('Index contract\t', body.address, '\terror. See logs file');
                            /** Make logs*/
                            logs(body);
                        } else {
                            console.log('Indexed\t', body.address);
                        }
                    });
                });
            }
        });
    }, interval * 1000)

}

function getFilesizeInBytes(filename) {
    const stats = fs.statSync(filename)
    const fileSizeInBytes = stats.size
    return fileSizeInBytes
}

/** options:
 * junctionId: string thu muc luu tren ipfs cluster
 * rm: rm sau khi add hay khong*/
function addFiletoIPFS(path, options, cb) {
    console.log("start add to ipfs");
    let ipfsPath = config.junctionId.toString() + '/' + path;
    let localPath = config.ipfs.tmpDir + '/' + path;
    let file = fs.readFileSync(localPath);
    ipfs.add(    {
        path: ipfsPath,
        content: file
    }, function (err, files) {
        if (err ) {
            console.log(err);
            // // ghi log
            // logs(err);
            cb(err);
        } else {
            console.log(files);
            /** Index to elasticsearch*/
            /**get starttime tu option*/
            var ipfs_result = files[0]; //JSON.parse(files);
            var createTime = moment.utc() - moment.utc(options.startTime);
            var body = {
                files: ipfs_result,
                totaltime: createTime
            }
            cb(null, body);

            // indexIPFS(body, function (es_err, es_res) {
            //     if (es_err) {
            //         logs(es_err);
            //     } else {
            //         // Make contract ? here
            //     }
            // });
            // /** Tao contract */

            // remove file neu chon
            if (options.rm) {
                fs.unlinkSync(localPath);
            }
        }
    });
    // [
    //     {
    //         "path": "tmp",
    //         "hash": "QmWXdjNC362aPDtwHPUE9o2VMqPeNeCQuTBTv1NsKtwypg",
    //         "size": 67
    //     },
    //     {
    //         "path": "/tmp/myfile.txt",
    //         "hash": "QmNz1UBzpdd4HfZ3qir3aPiRdX5a93XwTuDNyXRc6PKhWW",
    //         "size": 11
    //     }
    // ]
}

module.exports = pushFile;