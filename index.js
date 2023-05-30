const { 
  validatePath, 
  validateLink,
  recursivity,
  readFiles,
  stats,
  statsBroken
} = require('./functions.js');
const mdLinks = (pathUser, options) => { //retorna una promesa
  return new Promise((resolve, reject) => {
    const resultPath = validatePath(pathUser);
    const resultRecursivity = recursivity(resultPath)
    readFiles(resultRecursivity)
    .then((links)=> {
      // console.log(links);
      if (!options.validate && !options.stats) { //SIN VALIDATE
        resolve(links.flat()) //arrObj
        // return content;
      } else if (options.validate && !options.stats){ // --VALIDATE
        validateLink(links.flat())
        .then((linksValidated)=>{
          resolve (linksValidated)
        })
     //mandar file ruta donde se encontró
      }else if(options.validate && options.stats){ //--VALIDATE --STATS
        validateLink(links.flat())
        .then((linksValidated)=>{
          resolve(statsBroken(linksValidated))
        })
      }else if(options.stats && options.validate === undefined){
        resolve(stats(links.flat())) // --STATS
      }else{
        console.log('La ruta es inválida')
      }
    })
  });
};

module.exports = mdLinks;