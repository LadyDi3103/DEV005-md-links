const {
  validatePath,
  validateLink,
  recursivity,
  readFiles
} = require('./functions.js');
const mdLinks = (pathUser, options) => { //retorna una promesa
  return new Promise((resolve, reject) => {
    const resultPath = validatePath(pathUser);
    const resultRecursivity = recursivity(resultPath)
    readFiles(resultRecursivity)
      .then((links) => {
        // console.log(links);
        if (!options.validate && !options.stats) { //SIN VALIDATE
          resolve(links.flat()) //arrObj
          // return content;
        } else if(options.validate && !options.stats) { // --VALIDATE
          validateLink(links.flat())
            .then((linksValidated) => {
              resolve(linksValidated)
            })
        } 
      }
      ).catch((err)=>{
        reject(`La ruta es inválida ${err}`)
      })
  });
};

module.exports = mdLinks;