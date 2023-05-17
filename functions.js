const fs = require('fs');
const path = require('path');

// *****************************
//Valida sí la ruta existe
// -----------------------------
const validatePath = (pathUser) => {
    if (!fs.existsSync(pathUser)){ // Si la ruta no existe, retorna error
        return 'err'
    }
    // Para saber sí ruta es absoluta
    if(path.isAbsolute(pathUser)){
        return pathUser
    } else {
        // transforma ruta relativa a absoluta
        return path.resolve(pathUser)
    }
}
// Valida sí es directorio
// --------------------------
// const isDirectory = (pathUser) => {
//     if(fs.lstat(pathUser).isDirectory()){
//       return true;
//     } else{
//       return false;
//     }
// } 
// // Valida sí es archivo
// // -----------------------
// const isFile = (pathUser) => {
//     if(fs.statSync(pathUser).isFile()) {
//       return true;
//     } else{
//     return false;
//   }
// }
// // Función para identificar que tipo de archivo es la ruta
// // --------------------
// const typeOfExtension = (pathUser) => path.extname(pathUser);

// función asincróna para leer los files
// --------------------------
// const readFiles = (pathUser) => fs.readFile(pathUser, 'utf-8');

// console.log(readFiles('C:\Users\LABORATORIA\Desktop\MD CARPETA\Prueba\Prueba1\hola.md'));

// // función asincróna para leer los Directories
// // --------------------------
// const readDirectories = (pathUser) => fs.readdir(pathUser);
// console.log(readDirectories('C:\Users\LABORATORIA\Desktop\MD CARPETA\DEV005-md-links')); 
 //devuelve array de elementos
// ------------------------------

// function getMarkdownFiles(dirPath) {
//   // Se retorna una nueva promesa que se resolverá con la lista de archivos markdown encontrados
//   return new Promise((resolve, reject) => {
//     // Se lee el contenido del directorio
//     fs.readdir(dirPath, (err, files) => {
//       if (err) {
//         // Si hay un error al leer el directorio, se rechaza la promesa con el error correspondiente
//         reject(err);
//       } else {
//         // Se filtran los archivos con extensión .md
//         const markdownFiles = files.filter(file => path.extname(file) === '.md');

//         // Se mapea la lista de archivos markdown a una lista de objetos con la información del archivo
//         const filesInfo = markdownFiles.map(file => ({
//           path: path.join(dirPath, file),
//           name: file
//         }));

//         // Se resuelve la promesa con la lista de objetos con la información de los archivos markdown
//         resolve(filesInfo);
//       }
//     });
//   });
// }

// fs.readdir(pathUser,(error, files)=>{
//     files.forEach(file => {
//         console.log(file);
//     });        
// });
// })

module.exports = validatePath;
// , isFile, isDirectory, typeOfExtension, readFiles
