const fs = require('fs');
const path = require('path');
const axios = require('axios'); // librería npm para hacer solicitudes http
const MarkdownIt = require('markdown-it'),
	md = new MarkdownIt();
//Valida sí la ruta existe
const validatePath = (pathUser) => {
	if (!fs.existsSync(pathUser)) { // Si la ruta no existe, retorna error
		throw new Error('La ruta no existe');
	} else {
		if (path.isAbsolute(pathUser)) { // Para saber sí ruta es absoluta
			return pathUser
		} else {
			return path.resolve(pathUser)// transforma ruta relativa a absoluta
		}
	}
};
const isAdirectory = (pathUser) => {
	try {
		return fs.statSync(pathUser).isDirectory();
	} catch (error) {
		return false;
	}
};
const readDirectories = (pathUser) => fs.readdirSync(pathUser);
const fileMd = (pathUser) => {
	const md = path.extname(pathUser);
	return md === '.md';
}
// Valida sí es archivo
const isAfile = (pathUser) => fs.lstatSync(pathUser).isFile();
const readFiles = (pathUser) => {
	return new Promise((resolve, reject) => {
		fs.readFile(pathUser, 'utf-8', (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
};
// Función para identificar que tipo de archivo es la ruta
const typeOfExtension = (pathUser) => path.extname(path.basename(pathUser));
// Función buscar los enlaces
// const findLinksInFile = (filePath)=> {
// 	// const fileContent = fs.readFileSync(filePath, 'utf-8');
// 	const linkRegex = /\[(.*?)\]\((.*?)\)/g;
// 	const links = [];
// 	let match;
	
// 	while ((match = linkRegex.exec(filePath)) !== null) {
// 	  const link = {
// 		text: match[1],
// 		url: match[2]
// 	  };
// 	  links.push(link);
// 	}
	
// 	return links;
//   }

//    findLinksInFile('./hijo.md'); 

module.exports = {
	validatePath,
	isAdirectory,
	isAfile,
	readFiles,
	readDirectories,
	typeOfExtension,
	fileMd,
	// findLinksInFile
	// filesInfo
};
