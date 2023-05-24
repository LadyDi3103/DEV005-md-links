const mdLinks = require('./mdLinks.js');
// console.log('1', process.argv);
const [metodo, path, option] = process.argv.slice(2)
// console.log('2', process.argv);
// console.log('metodo', metodo);
// console.log('path', path);
// console.log('option', option);
// if(argumentsTerminal.includes('--validate')){ 
if (metodo === 'mdLinks' && path && !option) {   // no viene nada
    // consumir las promesas
    mdLinks(path, { validate: true })
        .then((resp) => {
            // const resultPath = validatePath(resp.href)
            console.log('cliTHEN', resp);
        })
        .catch((err) => {
            console.log('cliERR', err)
        })
} else if (metodo === 'mdLinks' && path && option === 'validate:true') {
    mdLinks(path, {
        validate: true
    }).then((resp) => {
        console.log('then', resp);
    }).catch((err) => {
        console.log('catch', err);
    })
}