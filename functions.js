const fs = require('fs');
const path = require('path');
const axios = require('axios'); // librería para hacer solicitudes http
const marked = require('marked');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

marked.setOptions({ mangle: false, headerIds: false });
//Valida sí la ruta existe
const validatePath = (pathUser) => {
	if (!fs.existsSync(pathUser)) {
		throw new Error('La ruta no existe');
	} else if (path.isAbsolute(pathUser)) {
		// console.log(pathUser); return pathUser

	} else {
		return path.resolve(pathUser)//ruta relativa a absoluta
	}
};
const isAdirectory = (pathUser) => {
	return fs.statSync(pathUser).isDirectory();
};
const readDirectories = (pathUser) => fs.readdirSync(pathUser);
const fileMd = (pathUser) => {
	const md = path.extname(pathUser);
	return md === '.md';
}
// Valida sí es archivo
// const isAfile = (pathUser) => fs.existsSync(pathUser) && fs.lstatSync(pathUser).isFile();

const recursivity = (resultPath) => {
let arrfilesMD = [];
	// console.log('----------', resultPath);
	if (isAdirectory(resultPath)) { // sí es un directorio true
		const contentDirectory = readDirectories(resultPath); //SE GUARDA CONTENIDO DEL DIRECTORIO
		// console.log('CONTENIDO000', contentDirectory);
		contentDirectory.forEach((e) => {
			// console.log('E', e);
			if (fileMd(resultPath)) {
				 arrfilesMD.push(path.join(resultPath, e));
				
			} else{
				arrfilesMD = arrfilesMD.concat(recursivity(path.join(resultPath, e)));	
			}
	
		});//array de rutas absolutas de los files md Filtrados
	} else if (fileMd(resultPath)) {
		arrfilesMD.push(resultPath);
	}
	// console.log('arrFILES',arrfilesMD);
	return arrfilesMD;  // array de archivos MD
}
const obtainLinks = (res, file) => {
	// console.log('Entró a la función obtainLinks', res);
	const arraylinks = [];
	const contentHTML = marked.parse(res);
	const dom = new JSDOM(contentHTML);
	const linksDOM = dom.window.document.querySelectorAll('a');
	// console.log('linksDOM', linksDOM.length);
	linksDOM.forEach((link) => {
		const url = link.href;
		const text = link.textContent;
		arraylinks.push({ href: url, text, file });
	});
	return arraylinks;
}
const readFiles = (arrFiles) => {
	const arrayLinks = arrFiles.map((file) => {
		//array promesas pendientes
		return new Promise((resolve, reject) => {
			fs.readFile(file, 'utf-8', (err, data) => {
				const links = obtainLinks(data, file)
				resolve(links);
			})
		});
		
	});
	console.log(arrayLinks, 78);
	return Promise.all(arrayLinks)//resuelvo el promiss all con el array de promesas pendientes.
};
const validateLink = (arrObjLINKS) => {
	const arrLinks = arrObjLINKS.map((e) => {
		return axios(e.href)
			.then((response) => {
				return {
					href: e.href,
					text: e.text,
					file: e.file,
					status: response.status,
					ok: 'ok',
				}
			})
			.catch((err) => {
				console.log(err.status, 94);
				return {
					href: e.href,
					text: e.text,
					file: e.file,
					status: err.status !== undefined ? err.status : 404,
					ok: 'fail',
				}
			});
	});
	return Promise.all(arrLinks);
}
// cantidad de links rotos (fail)
const broken = (links) => {
	const failMessage = links.filter(link => link.ok === 'fail');
	const uniqueFails = new Set(failMessage);
	return uniqueFails.size;
};

module.exports = {
	validatePath,
	readFiles,
	validateLink,
	recursivity,
	broken

};
