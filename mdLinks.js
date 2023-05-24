const { 
  validatePath, 
  isAdirectory, 
  isAfile, 
  readFiles, 
  readDirectories, 
  fileMd 
} = require('./functions.js');

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    //Identifica sí la ruta existe
    console.log('ruta relativa', path);
    const resultPath = validatePath(path);
    console.log('ruta absoluta', resultPath);
    console.log('es un directorio', isAdirectory(resultPath));

    if (isAdirectory(resultPath)) { // sí es un directorio
      const contentDirectory = readDirectories(resultPath); //el directorio leido
      console.log('Contenido del Directorio', contentDirectory);

      const filteredElements = contentDirectory.filter((e) => isAdirectory(resultPath + '\\' + e) || fileMd(e));
      console.log('resultPath', resultPath);
      console.log('Elementos filtrados', filteredElements);

      filteredElements.map((e) => mdLinks(resultPath + '\\' + e, options));
      console.log('ElementosMap', filteredElements);
    } else if (isAfile(resultPath)) {
      const isMarkdown = fileMd(resultPath);//el archivo leido
      if (isMarkdown) {
        const contentFile = readFiles(resultPath);
        console.log('Contenido del File', contentFile);
      }
    }
    if (resultPath === 'err') {
      reject('No es valido');
    } else {
      resolve({
        'href': resultPath,
        'validate': options.validate
      });
    }
  })
};

module.exports = mdLinks;