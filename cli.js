const mdLinks  = require('./mdLinks');
const validatePath = require('./functions.js');
const process = require('process');

// console.log(process);
// if(argumentsTerminal.includes('--validate')){ 
    // consumir las promesas
    console.log(process.argv[2]);
    mdLinks(process.argv[2],{validate:true})
    .then((resp)=> {
        const resultPath = validatePath(resp.href)
        console.log(resultPath);
    })
    .catch((err)=> {
        console.log(err)
    })
// } else {
//     mdLinks(process.argv[2], {validate:false})
//     .then((resp) => {
//         console.log('then', resp);
//     })
//     .catch((err)=> {
//         console.log('catch', err);
//     })
// }