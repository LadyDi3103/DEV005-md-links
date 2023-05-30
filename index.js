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
    .then((links)=> {
      // console.log(links);
      if (!options.validate) {
        resolve(links.flat()) //arrObj
        // return content;
      } else {
        validateLink(links.flat())
        .then((linksValidated)=>{
          resolve (linksValidated)
        })
     //mandar file ruta donde se encontró
      }
    })
    // .then((res) => {
    //   console.log('RESindex',res);
    //   resolve(res)   // if y else de opciones del validate...  option
    // })
    // .catch((err) => {
    //   reject(`Ruta inválida ${err}`);
    // })
  
  });
};

module.exports = mdLinks;