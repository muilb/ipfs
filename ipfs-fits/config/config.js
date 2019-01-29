/**
 * Created by lebamui on 27/01/2019.
 */
/**Ethereum config
 * **/
var wsHost = process.env.WS_HOST || "ws://localhost";
var wsPort = process.env.WS_PORT || "8545";
var ethAccount = process.env.ETH_ACCOUNT || '';
/** ElasticSearch config
 * **/
var esHost = process.env.ES_HOST || "localhost";
var esPort = process.env.ES_PORT || "9200";
var esQueryFrom = process.env.ES_QUERY_FROM || 0;
var esQuerySize = process.env.ES_QUERY_SIZE || 5;
/** Nats server config
 * natsServers: split by ',' **/
var natsServers = process.env.NATS_SERVERS || 'nats://demo.nats.io:4222';
/** IPFS cluster config**/
var ipfsHost = process.env.IPFS_HOST || 'localhost';
var ipfsPort = process.env.IPFS_PORT || '5001';
var tmpDir = process.env.IPFS_TMP_DIR || '/tmp'
/** FIts config
 * formatString: Dinh dang ngay gio, de luu file theo thoi gian. Mac dinh luu theo tung gio**/
var junctionId = process.env.FITS_JID || 'test_id';
var formatString = process.env.FITS_TIME_FORMAT || 'YYYY-MM-DDTH';
var wait = process.env.FIT_TIME_WAIT || 60;
module.exports = {
    "wsURL": wsHost + ":" + wsPort,
    "ethAccount": ethAccount,
    elastic: {
        'host': esHost,
        'port': esPort,
        'auth': '',
        from: esQueryFrom,
        size: esQuerySize
    },
    natsServers: natsServers.split(','),
    junctionId: junctionId,
    formatString: formatString,
    ipfs: {
        host: ipfsHost,
        port: ipfsPort,
        tmpDir: tmpDir,
        wait: wait
    }
}