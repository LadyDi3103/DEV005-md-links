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
		console.log(pathUser); return pathUser

	} else {
		return path.resolve(pathUser)//ruta relativa a absoluta
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
const isAfile = (pathUser) => fs.existsSync(pathUser) && fs.lstatSync(pathUser).isFile();
const readFiles = (pathUser) => {
	return new Promise((resolve, reject) => {
		fs.readFile(pathUser, 'utf-8', (err, data) => {    // REUTILIZAR PARA  la  que reciba un array de archivos bucle recorrido a cada ele
			// console.log('========', data, 42)
			if (err) {
				reject(err);
			} else {
				const links = obtainLinks(data, pathUser)
				resolve(links);
			}
		});
	});
};
const obtainLinks = (res, file) => {
	// console.log('Entró a la función obtainLinks', res);
	const arraylinks = [];
	const contentHTML = marked.parse(res);
	const dom = new JSDOM(contentHTML);
	const linksDOM = dom.window.document.querySelectorAll('a');
	console.log('linksDOM', linksDOM.length);
	linksDOM.forEach((link) => {
		const url = link.href;
		const text = link.textContent;
		arraylinks.push({ href: url, text, file });
	});
	return arraylinks;
}
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
				return {
					href: e.href,
					text: e.text,
					file: e.file,
					status: err.status,
					ok: 'fail',
				}
			});
	});
	return Promise.all(arrLinks);
}

module.exports = {
	validatePath,
	isAdirectory,
	isAfile,
	readFiles,
	readDirectories,
	fileMd,
	obtainLinks,
	validateLink
};
