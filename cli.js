#!/usr/bin/env node
const mdLinks = require('./index.js');
const [path, option] = process.argv.slice(2);

if (path && option === undefined) {
    console.log('ingresó al if de CLI');
    mdLinks(path, { validate: false })
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
            console.log('then', resp);
        })
        .catch((err) => {
            console.log('catch', err);
        });
}
// const mdLinks = (pathUser, options) => {
//   return new Promise((resolve, reject) => {
//     const resultPath = validatePath(pathUser);

//     if (isAdirectory(resultPath)) {
//       mdLinksRecursive(resultPath, options)
//         .then((links) => resolve(links))
//         .catch((err) => reject(`No se pudieron procesar los enlaces: ${err}`));
//     } else if (isAfile(resultPath)) {
//       const isMarkdown = fileMd(resultPath);
//       if (isMarkdown) {
//         readFiles(resultPath)
//           .then((content) => {
//             const linksValid = validateLink(content);
//             if (!options.validate) {
//               resolve(content);
//             } else {
//               resolve(linksValid);
//             }
//           })
//           .catch((err) => reject(`No se pudo leer el archivo: ${err}`));
//       }
//     } else {
//       reject('Ruta inválida');
//     }
//   });
// };

// const mdLinksRecursive = (dirPath, options) => {
//   const contentDirectory = readDirectories(dirPath);
//   const filteredElements = contentDirectory.filter(
//     (e) => isAdirectory(path.join(dirPath, e)) || fileMd(e)
//   );

//   const promises = filteredElements.map((e) =>
//     mdLinks(path.join(dirPath, e), options)
//   );

//   return Promise.all(promises)
//     .then((results) => results.flat())
//     .catch((err) => Promise.reject(err));
// };

module.exports = mdLinks;