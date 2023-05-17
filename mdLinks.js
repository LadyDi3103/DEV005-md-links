// const validatePath = require('./functions');
// const path = require('path'); 

const mdLinks = (path, options) => new Promise((resolve, reject) => {
//  const resultPath = validatePath(path) // Identifica sí la ruta existe
  // if (resultPath === 'err') {
    if(!path){
      reject('No existe la ruta');
    } else{
      resolve({
      'href': path, 
      'validate': options.validate});
    }
    
    // checkear o convertir a una ruta absoluta.
    // Probar sí esa ruta absoluta es un archivo o un directorio
    // Sí es un directorio (isDirectory) filtrar los archivos md. devuelve un array con archivos
    // Sí es un archivo -> devuelve un array con las rutas
  // } 
    // sí no existe la ruta, se rechaza la promesa.
    // resolve({path, options}); //SI VA
    // if(option.validate){
    //     resolve([{href:1, text: 2, file:'xyz', status: 200, ok: 'ok'},{href: 1, text: 2, file: 'xyz', status: 200, ok: 'ok'}]);
    // } else {
    //     resolve([{href: 1, text: 2, file: 'xyz'}, {href: 1, text: 2, file: 'xyz'}]);
    // }
});

module.exports = mdLinks;