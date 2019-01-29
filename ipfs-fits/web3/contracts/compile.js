// /**
//  * Created by lebamui on 10/01/2019.
//  */
// const solc = require('solc');
//
// function compile(input, findImports) {
//     if (solc && solc.compileStandardWrapper) {
//         const find = (path) => {
//             if (findImports === undefined) {
//                 return { error: 'Files not supported' };
//             } else {
//                 return findImports(path);
//             }
//         };
//         input.language = 'Solidity';
//         input.settings = Object.assign({
//             optimizer: { enabled: true },
//             outputSelection: {
//                 '*': {
//                     '*': ['abi', 'evm.bytecode.object']
//                 }
//             }
//         }, input.settings || {});
//         const ret = solc.compileStandardWrapper(JSON.stringify(input), find);
//         return JSON.parse(ret);
//     } else {
//         throw new Error('Contract compilation is not available in the browser.');
//     }
// }
//
// function compileSource(source) {
//     if (solc && solc.compileStandardWrapper) {
//         let input = {
//             language: 'Solidity',
//             sources: {
//                 source: {
//                     content: source
//                 }
//             }
//         };
//         let compiled = compile(input);
//         let ret = {
//             contracts: [],
//             errors: [],
//             warnings: []
//         };
//         if (compiled.contracts !== undefined && compiled.contracts.source !== undefined) {
//             Object.keys(compiled.contracts.source).forEach((k) => {
//                 ret.contracts.push({
//                     contract: k,
//                     bytecode: compiled.contracts.source[k].evm.bytecode.object,
//                     abi: compiled.contracts.source[k].abi
//                 });
//             });
//         }
//         (compiled.errors || []).forEach((e) => {
//             if (e.severity === 'warning') {
//                 ret.warnings.push(e);
//             } else {
//                 ret.errors.push(e);
//             }
//         });
//         return ret;
//     } else {
//         throw new Error('Contract compilation is not available in the browser.');
//     }
// }
//
// module.exports = compileSource;