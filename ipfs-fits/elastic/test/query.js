/**
 * Created by lebamui on 16/01/2019.
 */
console.log('Test query function at ulity/query\n');
require('../query-contract')({}, function (err, res) {
    console.log('Error\t', err);
    console.log(res, res.length);
});