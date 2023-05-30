#!/usr/bin/env node
const mdLinks = require('./index.js');
console.log(process.argv.slice(2), 3);
const [path, option, option2] = process.argv.slice(2);
// const objectOptions = {
//     validate: optionV,
//     stats: optionS
console.log(option, option2, 4);// }

if (path && option === undefined && option2 === undefined) {
    console.log('ingresó al if de CLI -- sin validate', path, option, option2, 11);
    mdLinks(path, { validate: false }) // con el punto then lo consumo
        .then((resp) => {
            console.log('cliTHEN', resp);
        })
        .catch((err) => {       
            if(option === !--validate){
                console.log('cliERR', err);
            }
        });
} else if (option === '--validate' && option2 === undefined) {
    console.log('ingresó al else if de CLI --validate');
    mdLinks(path, { validate: true })
        .then((resp) => {
            console.log('then', resp, 18);
        })
        .catch((err) => {
            console.log('catch', err, 21);
        });
} else if(option === '--stats', option2 === undefined){
    console.log('ingresó al else if de stats');
    mdLinks(path, { stats: true }) // con el punto then lo consumo
    .then((resp) => {
        console.log('cliSTAT', resp);
    })
    .catch((err) => {
        console.log('cliERRSTAT', err);
    });
} else if(option === '--validate' || option === '--stats' && option2 === '--stats' || option2 === '--validate'){
    console.log('ingresó al else if de stats y validate');
    mdLinks(path, { stats: true , validate: true }) // con el punto then lo consumo
    .then((resp) => {
        console.log('cliSTAT-VALIDATE', resp);
    })
    .catch((err) => {
        console.log('cliERRSTAT-VALIDATE', err);
    });
}
module.exports = mdLinks;