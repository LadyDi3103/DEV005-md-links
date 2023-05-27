const { 
  validatePath, 
  isAdirectory, 
  isAfile, 
  readFiles, 
  readDirectories, 
  fileMd, 
  obtainLinks,
  validateLink
} = require('./functions.js');

const path = require('node:path');

const mdLinks = (pathUser, options) => {
  return new Promise((resolve, reject) => {
    const resultPath = validatePath(pathUser);

    if (isAdirectory(resultPath)) { // sí es un directorio
      const contentDirectory = readDirectories(resultPath); 
      const filteredElements = contentDirectory.filter((e) => isAdirectory(path.join(resultPath, e)) || fileMd(e));
      console.log(filteredElements, 45);
      const promises = filteredElements.map((e) => mdLinks(path.join(resultPath, e), options)); 

      Promise.all(promises)
        .then((results) => {
        const links = results.flat();
        resolve(links);
      })
        .catch((err)=>{
          reject(`No se pudieron procesar los enlaces: ${err}`);
        });
    } else if (isAfile(resultPath)) {
      const isMarkdown = fileMd(resultPath);//el archivo leido
      if (isMarkdown) {
          readFiles(resultPath)
            .then((content) => {
              // console.log(content);
              // const getlinks = obtainLinks(content); //conficiones de opciones y según eso  retornar
              const linksValid = validateLink(content)
              if(!options.validate){
                resolve(content);
              } else{
                resolve (linksValid)    //mandar file ruta donde se encontró
              }
            })  
            .catch((err)=>{
            reject (`No se pudo leer el archivo ${err}`);
            });
      }
    } else {
      reject('Ruta invalida');
    }
  });
};

module.exports = mdLinks;