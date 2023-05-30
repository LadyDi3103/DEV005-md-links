#!/usr/bin/env node
const mdLinks = require('./index.js');
const [path, option] = process.argv.slice(2);

if (path && option === undefined) {
    console.log('ingresó al if de CLI', path);
    mdLinks(path, { validate: false }) // con el punto then lo consumo
        .then((resp) => {
            console.log('cliTHEN', resp);
        })
        .catch((err) => {
            console.log('cliERR', err);
        });
} else if (option === '--validate') {
    console.log('ingresó al else if de CLI');
    mdLinks(path, { validate: true })
        .then((resp) => {
            console.log('then', resp, 18);
        })
        .catch((err) => {
            console.log('catch', err, 21);
        });
}
module.exports = mdLinks;