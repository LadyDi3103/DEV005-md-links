const fs = require('fs');
const path = require('path');
const axios = require('axios'); // librería para hacer solicitudes http
const marked = require('marked');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

marked.setOptions({ mangle: false, headerIds: false });
const validatePath = (pathUser) => {
	if (!fs.existsSync(pathUser)) {
		throw new Error('La ruta no existe');
	} else if (path.isAbsolute(pathUser)) {
		return pathUser;
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
const recursivity = (resultPath) => {
	let arrfilesMD = [];
	if (isAdirectory(resultPath)) { // sí es un directorio true
		const contentDirectory = readDirectories(resultPath); //SE GUARDA CONTENIDO DEL DIRECTORIO
		contentDirectory.forEach((e) => {
			if (fileMd(resultPath)) {
				arrfilesMD.push(path.join(resultPath, e));
			} else {
				arrfilesMD = arrfilesMD.concat(recursivity(path.join(resultPath, e)));
			}
		});//array de rutas absolutas de los files md Filtrados
	} else if (fileMd(resultPath)) {
		arrfilesMD.push(resultPath);
	}
	return arrfilesMD;  // array de archivos MD
}
const obtainLinks = (res, file) => {
	const arraylinks = [];
	const contentHTML = marked.parse(res);
	const dom = new JSDOM(contentHTML);
	const linksDOM = dom.window.document.querySelectorAll('a');
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
	return Promise.all(arrayLinks)//resuelvo el promiss all con el array de promesas pendientes.
};
const validateLink = (arrObjLINKS) => {
	const arrLinks = arrObjLINKS.map((e) => {
		return axios(e.href)
			.then((response) => {
				return {
					href: e.href,
					text: e.text.substring(0,50),
					file: e.file,
					status: response.status,
					ok: 'ok',
				}
			})
			.catch((err) => {
				return {
					href: e.href,
					text: e.text.substring(0,50),
					file: e.file,
					status: err.status !== undefined ? err.status : 404,
					ok: 'fail',
				}
			});
	});
	return Promise.all(arrLinks);
}
const statsOption = (arrOfMDLinks) => {
    const totalLinks = arrOfMDLinks.length;
    const uniqueLinks = new Set(arrOfMDLinks.map((element) => element.href)).size;
    if (totalLinks === 0) {
        return 'There is 0 Links in this path! Try another one!';
    }
    const statsTemplate = `
        Final Stats:
        TOTAL: ${totalLinks}
        UNIQUE: ${uniqueLinks}
		`;
    return statsTemplate;
};
const statsValidate = (arrayOfMDLinks) => {
    const totalLinks = arrayOfMDLinks.length;
    const uniqueLinks = new Set(arrayOfMDLinks.map((element) => element.href)).size;
    const brokenLinks = new Set(arrayOfMDLinks.filter((link) => link.ok === 'fail')).size;
    const statsValidateTemplate = `
        Final Stats-Validate
        TOTAL: ${totalLinks}
        UNIQUE: ${uniqueLinks}
        BROKEN: ${brokenLinks}
		`;
    return statsValidateTemplate;
};
module.exports = {
	validatePath,
	readFiles,
	validateLink,
	recursivity,
	statsOption,
	statsValidate
};
