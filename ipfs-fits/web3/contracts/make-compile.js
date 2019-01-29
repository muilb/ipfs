// /**
//  * Created by lebamui on 10/01/2019.
//  */
// const fs = require('fs');
// const compile = require('./compile');
//
// var args = process.argv.slice(2);
// var solPath = args[0];
// try {
//     var filename = solPath.substring(solPath.lastIndexOf('/')+1);
//     var outputPath = "web3/contracts/" + filename + ".json";
//
//     const sol = fs.readFileSync(solPath, 'UTF-8');
//     var compiled = compile(sol.toString());
//
//     fs.writeFileSync(outputPath, JSON.stringify(compiled));
//
//     console.log('Compiled see: ', outputPath);
// } catch (e) {
//     console.log(e);
// }
