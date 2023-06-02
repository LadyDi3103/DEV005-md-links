#!/usr/bin/env node
const { argv } = require('node:process');
const mdLinks = require('./index.js');
const {
    statsOption,
    statsValidate
} = require('./functions.js');
var colors = require('colors');

const help = `
-----------------------------------------------------------------------
🆘🆘🆘🆘🆘🆘🆘🆘🆘🆘🆘🆘🆘🆘🆘🆘  HELP 🆘🆘🆘🆘🆘🆘🆘🆘🆘🆘🆘🆘🆘🆘🆘🆘
-----------------------------------------------------------------------
***********************************************************************
HOLA!!! 😁 
Recuerda que la estructura que debes seguir es la siguiente:
👉 mdLinks <path-to-file> [options]

    EJEMPLOS:
    mdLinks ./pruebas/file1.md
    mdLinks ./pruebas/file1.md --validate
    mdLinks ./pruebas/file1.md --validate --stats
    mdLinks ./pruebas/file1.md --stats

-----------------------------------------------------------------------
👉 La descripción de [options] con respecto a los resultados
    que puedes obtener es la siguiente:

    OPTIONS

    ⭐ --validate
            * href: URL encontrada
            * text: Texto que aparecía dentro del link.
            * file: Ruta del archivo donde se encontró el link.
            * status: Código de respuesta HTTP.
            * ok: Mensaje fail en caso de fallo u ok en caso de éxito.

    ⭐ --stats
            * Total: Total de links encontrados.
            * Unique: Total de links únicos encontrados.
    
    ⭐ --validate --stats || --stats --validate
            * Total: Total de links encontrados.
            * Unique: Total de links únicos encontrados.
            * Broken: Total de links rotos.

************************************************************************ 
`;

const [path, option, option2] = argv.slice(2);

if (path && option === undefined && option2 === undefined) { // SOLO PATH
    mdLinks(path, { validate: false })
        .then((resp) => {
            console.log(resp);
        })
        .catch((err) => {
            if (path.includes('--help')) {
                console.log(help);
            } else {
                console.log(err);
            }
        });
} else if (option === '--validate' && option2 === undefined) {
    mdLinks(path, { validate: true })
        .then((resp) => {
            console.log(resp);
        })
        .catch((err) => {
            console.log(err);
        });
} else if (option === '--stats' && option2 === undefined) { // --STATS
    mdLinks(path, { validate: false }) // con el punto then lo consumo
        .then((resp) => {
            console.log(colors.yellow('%s'), statsOption(resp));
        })
        .catch((err) => {
            console.log(err);
        });
} else if (path && option === '--validate' || option === '--stats' && option2 === '--stats' || option2 === '--validate') {
    mdLinks(path, { validate: true }) // con el punto then lo consumo
        .then((resp) => {
            console.log(colors.yellow('%s'), statsValidate(resp));
        })
        .catch((err) => {
            console.log(err);
        });
}
module.exports = mdLinks;